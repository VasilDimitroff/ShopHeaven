using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Users;
using ShopHeaven.Models.Responses.Users;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;

namespace ShopHeaven.Data.Services
{
    public class JwtService : IJwtService
    {
        private readonly UserManager<User> userManager;
        private readonly IUsersService usersService;
        private readonly IAuthService authService;
        private readonly ApplicationSettings applicationSettings;

        public JwtService(UserManager<User> userManager, IOptions<ApplicationSettings> applicationSettings, IUsersService usersService, IAuthService authService)
        {
            this.userManager = userManager;
            this.usersService = usersService;
            this.authService = authService;
            this.applicationSettings = applicationSettings.Value;
        }

        public string CreateToken(BasicUserResponseModel user, ICollection<string> userRoles)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.applicationSettings.Secret);

            var claims = new List<Claim>
                {
                     new Claim(ClaimTypes.NameIdentifier, user.Id),
                     new Claim(ClaimTypes.Name, user.Username),
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
                Expires = DateTime.UtcNow.AddDays(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;          
        }
    }
}
