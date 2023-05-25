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
using System.Security.Cryptography;

namespace ShopHeaven.Data.Services
{
    public class JwtService : IJwtService
    {
        private readonly IUsersService usersService;
        private readonly ShopDbContext db;
        private readonly ApplicationSettings applicationSettings;

        public JwtService(IOptions<ApplicationSettings> applicationSettings,
            IUsersService usersService,
            ShopDbContext db)
        {
            this.usersService = usersService;
            this.db = db;
            this.applicationSettings = applicationSettings.Value;
        }

        public async Task<string> CreateJwtTokenAsync(string userId, ICollection<string> userRoles)
        {
            var user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == userId && x.IsDeleted != true);

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
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;          
        }

        public async Task SetRefreshTokenAsync(RefreshToken refreshToken, string userId)
        {
            User user = await this.db.Users.FirstOrDefaultAsync(x => x.Id == userId && x.IsDeleted != true);

            if (user == null)
            {
                throw new ArgumentException(GlobalConstants.UserNotFound);
            }

            user.RefreshToken = refreshToken.Token;
            user.TokenCreated = refreshToken.CreatedOn;
            user.TokenExpires = refreshToken.Expires;

            await db.SaveChangesAsync();
        }

        public async Task<UserAuthorizationModel> FindUserByRefreshTokenAsync(string refreshToken)
        {
            User user = await this.db.Users.FirstOrDefaultAsync(x => x.RefreshToken == refreshToken && x.IsDeleted != true);

            if (user == null)
            {
                throw new UnauthorizedAccessException(GlobalConstants.UserNotFound);
            }

            var roles = await this.usersService.GetRolesNamesAsync(user.Id);

            var userModel = new UserAuthorizationModel
            {
                Id = user.Id,
                Email = user.Email,
                Roles = roles,
                RefreshToken = user.RefreshToken,
                TokenCreated = (DateTime)user.TokenCreated,
                TokenExpires = (DateTime)user.TokenExpires,
            };

            return userModel;
        }

        public RefreshToken CreateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.UtcNow.AddDays(1),
                CreatedOn = DateTime.UtcNow,
            };

            return refreshToken;
        }

        public async Task DeleteRefreshTokenAsync(string token)
        {
            var user = await this.db.Users.FirstOrDefaultAsync(x => x.RefreshToken == token && x.IsDeleted != true);
            user.RefreshToken = "";
            await this.db.SaveChangesAsync();
        }
    }
}
