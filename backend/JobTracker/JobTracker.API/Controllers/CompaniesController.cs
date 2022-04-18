using JobTracker.Core.Database;
using JobTracker.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JobTracker.API.Controllers
{
    [ApiController]
    [Route("companies")]
    public class CompaniesController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public CompaniesController(ApplicationDbContext dbContext)
        {
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
    }
}
