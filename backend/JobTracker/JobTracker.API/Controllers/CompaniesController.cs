using JobTracker.Core.Database;
using JobTracker.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace JobTracker.API.Controllers
{
    [ApiController]
    [Route("companies")]
    public class CompaniesController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<User> _userManager;

        public CompaniesController(ApplicationDbContext dbContext, UserManager<User> userManager)
        {
            _userManager = userManager;
            _dbContext = dbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddCompany(string companyName)
        {
            if (companyName.Length < 5)
                return BadRequest("Invalid name! Less than 5 characters!");

            var existingCompany = await _dbContext.Companies.FirstOrDefaultAsync(p => p.CompanyName == companyName);

            if (existingCompany != null)
                return BadRequest("Invalid name! Company already exist!");

            var company = new Company() { CompanyName = companyName };

            var companyEntry = await _dbContext.Companies.AddAsync(company);

            await _dbContext.SaveChangesAsync();

            return Ok(company);
        }

        [HttpGet]
        public async Task<IActionResult> GetCompanies()
        {
            var companies = await _dbContext.Companies.ToListAsync();
            return Ok(companies);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            var userEmail = User.FindFirstValue(JwtRegisteredClaimNames.Email);
            var user = await _userManager.FindByEmailAsync(userEmail);

            var fnd = await _dbContext.Companies.Where(c => c.UserId == user.Id && c.Id == id).FirstOrDefaultAsync();

            if (fnd == null)
            {
                return BadRequest("Company does not exist or you do not have access");
            }

            _dbContext.Companies.Remove(fnd);

            await _dbContext.SaveChangesAsync();
            return Ok(fnd);
        }
    }
}
