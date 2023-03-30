using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services;
using ShopHeaven.Models.Requests;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService usersService;

        public UsersController(IUsersService usersService)
        {
            this.usersService = usersService;
        }

        [Route("create")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserRequestModel model)
        {
            try
            {
               IdentityResult result =  await this.usersService.CreateUser(model);

               if (!result.Succeeded)
               {
                   return BadRequest(result.Errors);
               }

                return Ok($"User with username {model.Username} successfully created");
            }
            catch (Exception x)
            {
                return BadRequest(x.Message);
            }
        }
    }
}
