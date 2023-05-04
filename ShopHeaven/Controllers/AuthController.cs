using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Users;
using ShopHeaven.Models.Responses.Users;
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
        private readonly IUsersService usersService;
        private readonly ApplicationSettings applicationSettings;

        public AuthController(UserManager<User> userManager, IOptions<ApplicationSettings> applicationSettings, IUsersService usersService)
        {
            this.userManager = userManager;
            this.usersService = usersService;
            this.applicationSettings = applicationSettings.Value;
        }

        [HttpPost]
        [Route(nameof(Register))]
        public async Task<ActionResult> Register(CreateUserRequestModel model)
        {
            try
            {
                await this.usersService.RegisterAsync(model);
            }
            catch (Exception ex)
            {
                if (ex.Message == GlobalConstants.UserWithThisEmailAlreadyExists)
                {
                    return StatusCode(StatusCodes.Status403Forbidden, ex.Message);
                }

                return BadRequest(ex.Message);
            }

            return Ok(GlobalConstants.UserSuccessfullyRegistered);
        }

        [HttpPost]
        [Route(nameof(Login))]
        public async Task<ActionResult<string>> Login(LoginUserRequestModel model)
        {
            try
            {
                var user = await this.userManager.FindByEmailAsync(model.Email.Trim());

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
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(60),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var encryptedToken = tokenHandler.WriteToken(token);

                IList<string> userRoles = await this.usersService.GetUserRolesAsync(user.Id);

                var response = new LoginUserResponseModel
                {
                    Id = user.Id,
                    Email = user.Email.Trim(),
                    JwtToken = encryptedToken,
                    Roles = userRoles
                };

                return Ok(response);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            } 
         }
    }
}
