using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Roles;
using ShopHeaven.Models.Requests.Users;
using ShopHeaven.Models.Responses.Roles;
using ShopHeaven.Models.Responses.Users;
using System.Data;
using System.Security.Claims;

namespace ShopHeaven.Data.Services
{
    public class UsersService : IUsersService
    {
        private readonly UserManager<User> userManager;
        private readonly ShopDbContext db;
        private readonly IHttpContextAccessor httpContextAccessor;

        public UsersService(UserManager<User> userManager, ShopDbContext db, IHttpContextAccessor httpContextAccessor)
        {
            this.userManager = userManager;
            this.db = db;
            this.httpContextAccessor = httpContextAccessor;
        }

        public async Task RegisterAsync(CreateUserRequestModel model)
        {
            User userWithSameEmail = await db.Users.FirstOrDefaultAsync(x => x.Email == model.Email.Trim() && x.IsDeleted != true);

            if (userWithSameEmail != null)
            {
                throw new ArgumentException(GlobalConstants.UserWithThisEmailAlreadyExists);
            }

            if (model.Password.Trim() != model.ConfirmPassword.Trim())
            {
                throw new ArgumentException(GlobalConstants.PasswordsDoesntMatch);
            }

            if (model.Password.Length < GlobalConstants.PasswordLength)
            {
                throw new ArgumentException(GlobalConstants.PasswordLengthNotEnough);
            }

            User user = new User
            {
                UserName = "User" + (db.Users.Count() + 6564),
                Email = model.Email.Trim(),
                IsDeleted = false,
                TokenCreated = null,
                TokenExpires = null,
                RefreshToken = ""
            };

            Wishlist wishlist = new Wishlist { UserId = user.Id };
            Cart cart = new Cart { UserId = user.Id };

            user.CartId = cart.Id;
            user.WishlistId = wishlist.Id;

            var result = await userManager.CreateAsync(user, model.Password.Trim());

            if (!result.Succeeded)
            {
                throw new ArgumentException(GlobalConstants.UserNotCreated);
            }

            //add user by default in user role
            var appUserRole = await this.db.Roles.FirstOrDefaultAsync(x => x.Name == GlobalConstants.UserRoleName);

            var userRole = new IdentityUserRole<string>()
            {
                RoleId = appUserRole.Id,
                UserId = user.Id
            };

            await this.db.Wishlists.AddAsync(wishlist);
            await this.db.Carts.AddAsync(cart);
            await this.db.UserRoles.AddAsync(userRole);

            await this.db.SaveChangesAsync();
        }

        public async Task<IList<string>> GetUserRolesNamesAsync(string userId)
        {
            var user = await this.GetUserAsync(userId);

            IList<string> userRoles = await userManager.GetRolesAsync(user);

            return userRoles;
        }

        //implement searching of user!!
        public async Task<GetUsersAndRolesResponseModel> GetAllAsync(UserPaginationRequestModel model)
        {
            var allRoles = await db.Roles.Select(x => new UserRoleResponseModel
            {
                RoleId = x.Id,
                Name = x.Name,
            })
                .ToListAsync();

            string searchTermToLower = model.SearchTerm.Trim().ToLower();

            //gets deleted users too
            var usersCount = await this.db.Users
               .Where(u => model.Criteria == "" 
                           ? u.Email.ToLower().Contains(searchTermToLower) || u.UserName.ToLower().Contains(searchTermToLower)
                           : (model.Criteria.ToLower() == "email"
                               ? u.Email.ToLower().Contains(searchTermToLower)
                               : u.UserName.ToLower().Contains(searchTermToLower))
                           )
                .CountAsync();

            List<UserWithRolesResponseModel> usersWithRoles = await GetAllUsersWithRolesInfoAsync(model);
            usersWithRoles = usersWithRoles.OrderByDescending(x => x.CreatedOn).ToList();

            var usersAndRoles = new GetUsersAndRolesResponseModel
            {
                Users = usersWithRoles.ToList(),
                ApplicationRoles = allRoles.ToList(),
                UsersCount = usersCount,
                PagesCount = (int)Math.Ceiling((double)usersCount / model.RecordsPerPage),   
            };

            return usersAndRoles;
        }

        public UserResponseModel GetUserInfoFromJwt()
        {
            if (httpContextAccessor.HttpContext == null)
            {
                return null;
            }

            string id = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (id == null)
            {
                return null;
            }

            var username = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
            string email = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Email);
            string createdOn = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.DateOfBirth);

            IList<Claim> claimRoles = httpContextAccessor.HttpContext.User
                .FindAll(ClaimTypes.Role)
                .ToList();

            IList<string> roles = new List<string>();

            foreach (Claim role in claimRoles)
            {
                roles.Add(role.Value.ToString());
            }

            var user = new UserResponseModel()
            {
                Id = id,
                Username = username,
                Email = email,
                Roles = roles,
            };

            return user;
        }

        public async Task<UserResponseModel> GetAuthInfoByUserEmail(string email)
        {
            var userModel = await db.Users
                .Where(x => x.Email == email && x.IsDeleted != true)
                .Include(x => x.Wishlist)
                .ThenInclude(w => w.Products.Where(x => x.IsDeleted != true))
                .Include(x => x.Cart)
                .Select(user => new UserResponseModel
                {
                    Id = user.Id,
                    Email = user.Email,
                    Username = user.UserName,
                    CartId = user.CartId,
                    WishlistId = user.WishlistId,
                    CartProductsCount = user.Cart.Products.Where(x => x.IsDeleted != true).Count(),
                    WishlistProductsCount = user.Wishlist.Products.Where(x => x.IsDeleted != true).Count()
                })
                .FirstOrDefaultAsync();

            if (userModel == null)
            {
                return null;
            }

            var userRoles = await GetUserRolesNamesAsync(userModel.Id);

            userModel.Roles = userRoles;

            return userModel;
        }

        public async Task<UserWithRolesResponseModel> AddToRoleAsync(AddToRoleRequestModel model)
        {
            var isUserInThisRole = await this.db.UserRoles
                .AnyAsync(x => x.RoleId == model.RoleId && x.UserId == model.UserId);

            if (isUserInThisRole)
            {
                throw new ArgumentException(GlobalConstants.UserIsAlreadyInThisRole);
            }

            var user = await this.GetUserAsync(model.UserId);

            if (user == null)
            {
                throw new ArgumentNullException(GlobalConstants.UserDoesNotExist);
            }

            var role = await this.db.Roles
                .FirstOrDefaultAsync(x => x.Id == model.RoleId);

            if (role == null)
            {
                throw new ArgumentNullException(GlobalConstants.RoleWithThisIdDoesNotExist);
            }

            var userRole = new IdentityUserRole<string>()
            {
                RoleId = model.RoleId,
                UserId = model.UserId
            };

            await this.db.UserRoles.AddAsync(userRole);

            await this.db.SaveChangesAsync();

            var userModel = await GetUserWithRolesAsync(model.UserId);

            return userModel;

        }

        public async Task<UserWithRolesResponseModel> RemoveFromRoleAsync(RemoveFromRoleRequestModel model)
        {
            var userRole = await this.db.UserRoles
              .FirstOrDefaultAsync(x => x.UserId == model.UserId && x.RoleId == model.RoleId);

            if (userRole == null)
            {
                throw new ArgumentException(GlobalConstants.UserIsNotInTheSelectedRole);
            }

            var user = await this.GetUserAsync(model.UserId);

            var role = await this.db.Roles
                .FirstOrDefaultAsync(x => x.Id == model.RoleId);

            if (role == null)
            {
                throw new ArgumentNullException(GlobalConstants.RoleWithThisIdDoesNotExist);
            }

            if (role.Name == GlobalConstants.UserRoleName)
            {
                throw new InvalidOperationException(GlobalConstants.CannotRemoveUserFromUserRole);
            }

            this.db.UserRoles.Remove(userRole);

            await this.db.SaveChangesAsync();

            var userModel = await GetUserWithRolesAsync(model.UserId);

            return userModel;

        }

        public async Task<UserWithRolesResponseModel> EditUserAsync(EditUserRequestModel model)
        {
            var user = await this.GetUserAsync(model.Id);

            if (string.IsNullOrWhiteSpace(model.Username) 
                || model.Username.Trim().Length < GlobalConstants.UsernameLength)
            {
                throw new ArgumentException(GlobalConstants.UsernameLengthNotEnough);
            }

            user.Email = model.Email.Trim();
            user.UserName = model.Username.Trim();
            user.ModifiedOn = DateTime.UtcNow;

            await this.db.SaveChangesAsync();

            var userModel = await GetUserWithRolesAsync(user.Id);

            return userModel;
        }

        public async Task<UserWithRolesResponseModel> DeleteUserAsync(DeleteUserRequestModel model)
        {
            var user = await this.GetUserAsync(model.Id);

            user.IsDeleted = true;
            user.DeletedOn = DateTime.UtcNow;

            await this.db.SaveChangesAsync();

            var userModel = await GetUserWithRolesAsync(user.Id);

            return userModel;
        }

        public async Task<UserWithRolesResponseModel> UndeleteUserAsync(UndeleteUserRequestModel model)
        {
            var user = await this.GetUserAsync(model.Id);

            user.IsDeleted = false;
            user.DeletedOn = null;

            await this.db.SaveChangesAsync();

            var userModel = await GetUserWithRolesAsync(user.Id);

            return userModel;
        }

        public async Task<User> GetUserAsync(string userId)
        {
            var user = await this.db.Users
                .FirstOrDefaultAsync(x => x.Id == userId && x.IsDeleted != true);

            if (user == null)
            {
                throw new ArgumentException(GlobalConstants.UserDoesNotExist);
            }

            return user;
        }

        public async Task<UserWithRolesResponseModel> GetUserWithRolesAsync(string userId)
        {
            var user = await this.db.Users
                //.Where(u => u.Id == userId && u.IsDeleted != true)
                .Where(u => u.Id == userId)
                .Select(u => new UserWithRolesResponseModel
                {
                    Id = u.Id,
                    Username = u.UserName,
                    Email = u.Email,
                    CreatedOn = u.CreatedOn,
                    IsDeleted = u.IsDeleted,
                    Roles = this.db.UserRoles
                        .Where(ur => ur.UserId == u.Id)
                        .Select(ur => new UserRoleResponseModel
                        {
                            RoleId = ur.RoleId,
                            Name = this.db.Roles.FirstOrDefault(r => r.Id == ur.RoleId).Name
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            return user;
        }

        private async Task<List<UserWithRolesResponseModel>> GetAllUsersWithRolesInfoAsync(UserPaginationRequestModel model)
        {
            string searchTermToLower = model.SearchTerm.Trim().ToLower();
            
            //gets deleted users too
            return await db.Users
                  //.Where(u => u.IsDeleted != true)
                  .Where(u => model.Criteria == ""
                               ? u.Email.ToLower().Contains(searchTermToLower) || u.UserName.ToLower().Contains(searchTermToLower)
                               : (model.Criteria.ToLower() == "email"
                                   ? u.Email.ToLower().Contains(searchTermToLower)
                                   : u.UserName.ToLower().Contains(searchTermToLower))
                               )
                  .OrderByDescending(x => x.CreatedOn)
                  .Skip((model.Page - 1) * model.RecordsPerPage)
                  .Take(model.RecordsPerPage)
                  .Join(
                      db.UserRoles,
                      user => user.Id,
                      userRole => userRole.UserId,
                      (user, userRole) => new { User = user, UserRole = userRole })
                  .Join(
                      db.Roles,
                      ur => ur.UserRole.RoleId,
                      role => role.Id,
                      (ur, role) => new { User = ur.User, Role = role })
                  .GroupBy(
                      ur => new { ur.User.Id, ur.User.Email, ur.User.UserName, ur.User.CreatedOn, ur.User.IsDeleted },
                      ur => ur.Role)
                  .Select(
                      g => new UserWithRolesResponseModel
                      {
                          Id = g.Key.Id,
                          Username = g.Key.UserName,
                          Email = g.Key.Email,
                          CreatedOn = g.Key.CreatedOn,
                          IsDeleted = g.Key.IsDeleted,
                          Roles = g.Select(x => new UserRoleResponseModel
                          {
                              Name = x.Name,
                              RoleId = x.Id
                          })
                          .ToList()
                      })
                  .ToListAsync();
        }
    }
}