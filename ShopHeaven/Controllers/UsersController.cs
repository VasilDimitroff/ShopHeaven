using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
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
            // add this as body when you want to create test user
            //{
            //     "username": "vasil",
            //    "password": "TodorJivkov_91",
            //    "confirmPassword": "TodorJivkov_91",
            //    "cartId": "cartId",
            //    "wishlistId": "wishlistId",
            //    "isDeleted": "false"
            //}

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
