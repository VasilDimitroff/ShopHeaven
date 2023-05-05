using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly IJwtService jwtService;
        private readonly IAuthService authService;
        private readonly IUsersService usersService;
        private readonly ApplicationSettings applicationSettings;

        public AuthController(UserManager<User> userManager,
            IOptions<ApplicationSettings> applicationSettings,
            IJwtService jwtService,
            IAuthService authService,
            IUsersService usersService)
        {
            this.userManager = userManager;
            this.jwtService = jwtService;
            this.authService = authService;
            this.usersService = usersService;
            this.applicationSettings = applicationSettings.Value;
        }

        [HttpPost, Route(nameof(Register))]
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
        [HttpGet, Authorize, Route(nameof(GetMe))]
        public ActionResult<object> GetMe()
        {
            var user = this.usersService.GetUserInfo();

            if (user == null)
            {
                return Unauthorized();
            }

            return Ok(user);
        }

        [HttpPost, Route(nameof(Login))]
        public async Task<ActionResult<string>> Login(LoginUserRequestModel model)
        {
            try
            {
                var user = await this.usersService.GetUserByEmailAsync(model.Email.Trim());

                if (user == null)
                {
                    return Unauthorized(GlobalConstants.UserNotFound);
                }

                var passwordValid = await this.authService.ValidatePasswordAsync(user.Id, model.Password);

                if (!passwordValid)
                {
                    return Unauthorized(GlobalConstants.PasswordNotValid);
                }

                IList<string> userRoles = await this.usersService.GetUserRolesAsync(user.Id);

                var jwtToken = this.jwtService.CreateToken(user, userRoles);

                var response = new LoginUserResponseModel
                {
                    Id = user.Id,
                    Email = user.Email,
                    JwtToken = jwtToken,
                    Roles = user.Roles,
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
