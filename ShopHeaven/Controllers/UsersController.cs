using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopHeaven.Data.Services.Contracts;
using ShopHeaven.Models.Requests.Roles;
using ShopHeaven.Models.Requests.Users;
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

        [HttpPost, Route(nameof(GetAll)), Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<ActionResult<GetUsersAndRolesResponseModel>> GetAll([FromBody] UserPaginationRequestModel model)
        {
            try
            {
                if (model.Criteria == null)
                {
                    model.Criteria = "";
                };

                var users = await this.usersService.GetAllAsync(model);

                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        [HttpPost, Route(nameof(Edit)), Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<ActionResult<UserWithRolesResponseModel>> Edit(EditUserRequestModel model)
        {
            try
            {
                var user = await this.usersService.EditUserAsync(model);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

       
        [HttpPost, Route(nameof(Delete)), Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<ActionResult<UserWithRolesResponseModel>> Delete(DeleteUserRequestModel model)
        {
            try
            {
                var user = await this.usersService.DeleteUserAsync(model);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost, Route(nameof(Undelete)), Authorize(Roles = GlobalConstants.AdministratorRoleName)]
        public async Task<ActionResult<UserWithRolesResponseModel>> Undelete(UndeleteUserRequestModel model)
        {
            try
            {
                var user = await this.usersService.UndeleteUserAsync(model);

                return Ok(user);
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
