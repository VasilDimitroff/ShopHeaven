using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Roles;
using ShopHeaven.Models.Responses.Users;

namespace ShopHeaven.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = GlobalConstants.AdministratorRoleName)]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService usersService;

        public UsersController(IUsersService usersService)
        {
            this.usersService = usersService;
        }

        [HttpGet, Route(nameof(GetAll)), Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<ActionResult<GetUsersAndRolesResponseModel>> GetAll()
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

        [HttpPost, Route(nameof(AddToRole)), Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<ActionResult<UserWithRolesResponseModel>> AddToRole(AddToRoleRequestModel model)
        {
            try
            {
                var user = await this.usersService.AddToRoleAsync(model);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost, Route(nameof(RemoveFromRole)), Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<ActionResult<UserWithRolesResponseModel>> RemoveFromRole(RemoveFromRoleRequestModel model)
        {
            try
            {
                var user = await this.usersService.RemoveFromRoleAsync(model);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
