using JobTracker.API.requests;
using JobTracker.Core.Database;
using JobTracker.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace JobTracker.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/jobs")]
    public class JobController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _dbContext;
        public JobController(UserManager<User> userManager, ApplicationDbContext dbContext)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddJob(AddJobRequest Job)
        {
            var userEmail = User.FindFirstValue(JwtRegisteredClaimNames.Email);
            var user = await _userManager.FindByEmailAsync(userEmail);

            var company = await _dbContext.Companies.Where(c => c.UserId == user.Id || c.UserId == null).FirstOrDefaultAsync(c => c.Id == Job.CompanyId);
            
            if(company == null)
                return BadRequest("Company does not exist");


            var finalJob = new Job() { JobName = Job.JobName, Status = Job.Status, Created = DateTime.Now, CompanyId = Job.CompanyId, Notes = Job.Notes, Deadline = Job.Deadline, UserId = user.Id};

            var jobEntry = await _dbContext.Jobs.AddAsync(finalJob);

            await _dbContext.SaveChangesAsync();

            return Ok(finalJob);

        }
    }
}
