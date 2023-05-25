using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Users;
using ShopHeaven.Models.Responses.Roles;
using ShopHeaven.Models.Responses.Users;
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

            await this.db.UserRoles.AddAsync(userRole);

            await this.db.SaveChangesAsync();
        }

        public async Task<IList<string>> GetUserRolesAsync(string userId)
        {
            var user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == userId && x.IsDeleted != true);

            if (user == null)
            {
                throw new ArgumentNullException(GlobalConstants.UserNotFound);
            }

            IList<string> userRoles = await userManager.GetRolesAsync(user);

            return userRoles;
        }

        public async Task<IList<UserWithRolesResponseModel>> GetAllAsync()
        {
            var usersWithRoles = await db.Users
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
                      ur => new { ur.User.Id, ur.User.Email, ur.User.UserName, ur.User.CreatedOn },
                      ur => ur.Role)
                  .Select(
                      g => new UserWithRolesResponseModel
                      {
                          Id = g.Key.Id,
                          Username = g.Key.UserName,
                          Email = g.Key.Email,
                          CreatedOn = g.Key.CreatedOn.ToString(),
                          Roles = g.Select(x => new UserRoleResponseModel
                          {
                              Name = x.Name,
                              RoleId = x.Id
                          })
                          .ToList()
                      })
                  .ToListAsync();

            return usersWithRoles;
        }

        public BasicUserResponseModel GetUserInfoFromJwt()
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

            var user = new BasicUserResponseModel()
            {
                Id = id,
                Username = username,
                Email = email,
                Roles = roles,
                CreatedOn = createdOn,
            };

            return user;
        }

        public async Task<BasicUserResponseModel> GetUserByEmailAsync(string email)
        {

            var user = await db.Users.FirstOrDefaultAsync(x => x.Email == email && x.IsDeleted != true);

            if (user == null)
            {
                return null;
            }

            var userRoles = await GetUserRolesAsync(user.Id);

            var userModel = new BasicUserResponseModel
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.UserName,
                CreatedOn = user.CreatedOn.ToString(),
                Roles = userRoles,
            };

            return userModel;
        }
    }
}