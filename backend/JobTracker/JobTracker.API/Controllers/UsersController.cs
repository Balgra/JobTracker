using JobTracker.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace JobTracker.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/users")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;

        public UsersController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> AddUser()
        {
            var userEmail = User.FindFirstValue(JwtRegisteredClaimNames.Email);

            var user = await _userManager.FindByEmailAsync(userEmail);

            if (user == null)
            {
                var result = await _userManager.CreateAsync(new User() { Email = userEmail, UserName = userEmail});
                if (result.Succeeded)
                {
                    return Ok();
                }
                return BadRequest(result.Errors);
            }

            return Ok();
        }
    }
}
