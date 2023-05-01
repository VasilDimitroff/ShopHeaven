using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ShopHeaven.Data.Models;
using ShopHeaven.Models.Requests.Users;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly ApplicationSettings applicationSettings;

        public AuthController(UserManager<User> userManager, IOptions<ApplicationSettings> applicationSettings)
        {
            this.userManager = userManager;
            this.applicationSettings = applicationSettings.Value;
        }

        [HttpPost]
        [Route(nameof(Register))]
        public async Task<ActionResult> Register(CreateUserRequestModel model)
        {
            User user = new User { Email = model.Email, IsDeleted = false};

            Wishlist wishlist = new Wishlist { UserId = user.Id };
            Cart cart = new Cart { UserId = user.Id };

            user.CartId = cart.Id;
            user.WishlistId = wishlist.Id;

            IdentityResult result = await this.userManager.CreateAsync(user, model.Password);

            if(result.Succeeded)
            {
                return this.Ok("You are registered!");
            }
            
            return BadRequest(result.Errors);
        }

        [HttpPost]
        [Route(nameof(Login))]
        public async Task<ActionResult<string>> Login(LoginUserRequestModel model)
        {
            var user = await this.userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                return Unauthorized(GlobalConstants.UserNotFound);
            }

            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordValid)
            {
                return Unauthorized(GlobalConstants.PasswordNotValid);
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.applicationSettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity( new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)        
            };

             var token = tokenHandler.CreateToken(tokenDescriptor);
             var encryptedToken = tokenHandler.WriteToken(token);

            return encryptedToken;
         }
    }
}
