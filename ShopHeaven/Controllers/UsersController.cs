using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;

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

        [HttpGet]
        [Route(nameof(GetAll))]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var users = await this.usersService.GetAllAsync();

                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
