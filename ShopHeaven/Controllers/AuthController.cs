using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Users;
using ShopHeaven.Models.Responses.Users;
using System.Security.Cryptography;
using ShopHeaven.Models.Token;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;

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
        public async Task<ActionResult<UserRefreshTokenResponse>> Login(LoginUserRequestModel model)
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

                string jwtToken = await this.jwtService.CreateTokenAsync(user.Id, userRoles);

                RefreshToken refreshToken = GenerateRefreshToken();
                await SetRefreshToken(refreshToken, user.Id);

                UserRefreshTokenResponse response = new UserRefreshTokenResponse
                {
                    Id = user.Id,
                    Email = user.Email,
                    JwtToken = jwtToken,
                    Roles = user.Roles,
                    RefreshToken = refreshToken.Token,
                    TokenCreated = refreshToken.CreatedOn,
                    TokenExpires = refreshToken.Expires 
                };

                return Ok(response);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            } 
         }


        [HttpGet(nameof(RefreshToken))]
        public async Task<ActionResult<UserRefreshTokenResponse>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            var userModel = await this.jwtService.FindUserByRefreshTokenAsync(refreshToken);

            if (!userModel.RefreshToken.Equals(refreshToken))
            {
                return Unauthorized("Invalid Refresh Token.");
            }
            else if (userModel.TokenExpires < DateTime.UtcNow)
            {
                return Unauthorized("Token expired.");
            }

            var roles = await this.usersService.GetUserRolesAsync(userModel.Id);

            string token = await this.jwtService.CreateTokenAsync(userModel.Id, roles);
            var newRefreshToken = GenerateRefreshToken();
            await SetRefreshToken(newRefreshToken, userModel.Id);

            userModel.JwtToken = token;

            return Ok(userModel);
        }

        private RefreshToken GenerateRefreshToken()
        {
            var refreshToken = new RefreshToken
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.UtcNow.AddDays(1),
                CreatedOn = DateTime.UtcNow,
            };

            return refreshToken;
        }

        private async Task SetRefreshToken(RefreshToken newRefreshToken, string userId)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = false,
                Expires = newRefreshToken.Expires,
            };

            Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

            await this.jwtService.SetRefreshTokenAsync(newRefreshToken, userId);
        }
    }
}
