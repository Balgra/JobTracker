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

            if (user == null)
                return BadRequest("User does not exist");

            var company = await _dbContext.Companies.Where(c => c.UserId == user.Id || c.UserId == null).FirstOrDefaultAsync(c => c.Id == Job.CompanyId);
            
            if(company == null)
                return BadRequest("Company does not exist");


            var finalJob = new Job() { JobName = Job.JobName, Status = Job.Status, Created = DateTime.Now, CompanyId = Job.CompanyId, Notes = Job.Notes, Deadline = Job.Deadline, UserId = user.Id};

            var jobEntry = await _dbContext.Jobs.AddAsync(finalJob);

            await _dbContext.SaveChangesAsync();

            return Ok(finalJob);

        }

        [HttpGet]
        public async Task<IActionResult> GetJobs()
        {
            var userEmail = User.FindFirstValue(JwtRegisteredClaimNames.Email);
            var user = await _userManager.FindByEmailAsync(userEmail);

            var jobs = await _dbContext.Jobs.Where(j => j.UserId == user.Id).ToListAsync();

            foreach (var j in jobs)
                j.User = null;
        
            return Ok(jobs);
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetJobs(ApplicationStatus status)
        {
            var userEmail = User.FindFirstValue(JwtRegisteredClaimNames.Email);
            var user = await _userManager.FindByEmailAsync(userEmail);


            var jobs = await _dbContext.Jobs.Where(j => j.UserId == user.Id && j.Status==status).ToListAsync();
            
            foreach (var j in jobs)
                j.User = null;

            return Ok(jobs);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateJob(Job job)
        {
            var userEmail = User.FindFirstValue(JwtRegisteredClaimNames.Email);
            var user = await _userManager.FindByEmailAsync(userEmail);

            var fnd = await _dbContext.Jobs.Where(j => j.UserId == user.Id && j.Id == job.Id).FirstOrDefaultAsync();

            if(fnd == null)
            {
                return BadRequest("Job application not found");
            }

            if(await _dbContext.Companies.Where(c => c.Id == job.CompanyId).FirstOrDefaultAsync() == null)
            {
                return BadRequest("Company does not exist");
            }

            fnd.JobName = job.JobName;
            fnd.Status = job.Status;
            fnd.Notes = job.Notes;
            fnd.Deadline = job.Deadline;

            await _dbContext.SaveChangesAsync();

            return Ok(fnd);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteJob(int id)
        {
            var userEmail = User.FindFirstValue(JwtRegisteredClaimNames.Email);
            var user = await _userManager.FindByEmailAsync(userEmail);

            var fnd = await _dbContext.Jobs.Where(j => j.UserId == user.Id && j.Id == id).FirstOrDefaultAsync();

            if (fnd == null)
            {
                return BadRequest("Job application not found");
            }

            _dbContext.Jobs.Remove(fnd);

            await _dbContext.SaveChangesAsync();
            return Ok(fnd);
        }
    }
}
