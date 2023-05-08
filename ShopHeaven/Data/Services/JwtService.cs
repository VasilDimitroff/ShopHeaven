using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Responses.Users;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ShopHeaven.Models.Token;
using Microsoft.EntityFrameworkCore;
using Microsoft.CodeAnalysis.VisualBasic.Syntax;
using System.Security.Cryptography;

namespace ShopHeaven.Data.Services
{
    public class JwtService : IJwtService
    {
        private readonly UserManager<User> userManager;
        private readonly IUsersService usersService;
        private readonly IAuthService authService;
        private readonly ShopDbContext db;
        private readonly ApplicationSettings applicationSettings;

        public JwtService(UserManager<User> userManager,
            IOptions<ApplicationSettings> applicationSettings,
            IUsersService usersService,
            IAuthService authService,
            ShopDbContext db)
        {
            this.userManager = userManager;
            this.usersService = usersService;
            this.authService = authService;
            this.db = db;
            this.applicationSettings = applicationSettings.Value;
        }

        public async Task<string> CreateJwtTokenAsync(string userId, ICollection<string> userRoles)
        {
            var user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                throw new NullReferenceException(GlobalConstants.UserNotFound);
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.applicationSettings.Secret);

            var claims = new List<Claim>
                {
                     new Claim(ClaimTypes.NameIdentifier, user.Id),
                     new Claim(ClaimTypes.Name, user.UserName),
                     new Claim(ClaimTypes.Email, user.Email),
                     new Claim(ClaimTypes.DateOfBirth, user.CreatedOn.ToString()),
                };

            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;          
        }

        public async Task SetRefreshTokenAsync(RefreshToken refreshToken, string userId)
        {
            User user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == userId);

            if (user == null)
            {
                throw new ArgumentException(GlobalConstants.UserNotFound);
            }

            user.RefreshToken = refreshToken.Token;
            user.TokenCreated = refreshToken.CreatedOn;
            user.TokenExpires = refreshToken.Expires;

            var result = await db.SaveChangesAsync();
        }

        public async Task<UserAuthorizationModel> FindUserByRefreshTokenAsync(string refreshToken)
        {
            User user = await this.db.Users.FirstOrDefaultAsync(x => x.RefreshToken == refreshToken);

            if (user == null)
            {
                throw new UnauthorizedAccessException(GlobalConstants.UserDoesNotExist);
            }

            var roles = await this.usersService.GetUserRolesAsync(user.Id);

            var userModel = new UserAuthorizationModel
            {
                Id = user.Id,
                Email = user.Id,
                Roles = roles,
                RefreshToken = user.RefreshToken,
                TokenCreated = user.TokenCreated,
                TokenExpires = user.TokenExpires,
            };

            return userModel;
        }

        public RefreshToken CreateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.UtcNow.AddDays(5),
                CreatedOn = DateTime.UtcNow,
            };

            return refreshToken;
        }
    }
}
