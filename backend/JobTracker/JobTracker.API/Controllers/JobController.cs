using Hangfire;
using JobTracker.API.requests;
using JobTracker.Core.Database;
using JobTracker.Core.Models;
using JobTracker.Core.Services;
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
        private readonly IEmailSender _emailSender;

        public JobController(UserManager<User> userManager, ApplicationDbContext dbContext, IEmailSender emailSender)
        {
            _userManager = userManager;
            _dbContext = dbContext;
            _emailSender = emailSender;
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

            string companyName = company.CompanyName;

            BackgroundJob.Enqueue(() => _emailSender.SendEmailAsync(userEmail, "Job Application Added", @$"<h3>Hello there,</h3><p>You've just added a new job application: {Job.JobName}" + " at " + companyName));

            return Ok(finalJob);

        }

        [HttpGet]
        public async Task<IActionResult> GetJobs()
        {
            var userEmail = User.FindFirstValue(JwtRegisteredClaimNames.Email);
            var user = await _userManager.FindByEmailAsync(userEmail);

            var jobs = await _dbContext.Jobs.Where(j => j.UserId == user.Id).Include(p => p.Company).ToListAsync();

            foreach (var j in jobs)
                j.User = null;
        
            return Ok(jobs);
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetJobs(ApplicationStatus status)
        {
            var userEmail = User.FindFirstValue(JwtRegisteredClaimNames.Email);
            var user = await _userManager.FindByEmailAsync(userEmail);


            var jobs = await _dbContext.Jobs.Where(j => j.UserId == user.Id && j.Status==status).Include(p => p.Company).ToListAsync();
            
            foreach (var j in jobs)
                j.User = null;

            return Ok(jobs);
        }

        [HttpGet("id")]
        public async Task<IActionResult> GetJobById(int id)
        {
            var userEmail = User.FindFirstValue(JwtRegisteredClaimNames.Email);
            var user = await _userManager.FindByEmailAsync(userEmail);

            var job = await _dbContext.Jobs.Where(j => j.UserId == user.Id && j.Id == id).Include(p => p.Company).FirstOrDefaultAsync();

            if(job == null)
            {
                return BadRequest("Job does not exist or unauthorized");
            }

            job.User = null;

            return Ok(job);
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
                return BadRequest("Job application not found or not authorized");
            }

            _dbContext.Jobs.Remove(fnd);

            await _dbContext.SaveChangesAsync();
            return Ok(fnd);
        }
    }
}
