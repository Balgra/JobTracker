using Hangfire;
using JobTracker.Core.Database;
using JobTracker.Core.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobTracker.Core.Services
{
    public class DeadlineNotificationService : IDeadlineNotificationService
    {
        private readonly UserManager<User> _userManager;
        private readonly ApplicationDbContext _dbContext;
        private readonly IEmailSender _emailSender;

        public DeadlineNotificationService(UserManager<User> userManager, ApplicationDbContext dbContext, IEmailSender emailSender)
        {
            _userManager = userManager;
            _dbContext = dbContext;
            _emailSender = emailSender;
        }

        private string GetNotificationEmailHTML(List<Job> jobs)
        {
            string email_li = "";
            string pre = "";

            foreach (var job in jobs)
            {

                if (job.Status == ApplicationStatus.OnlineAssignment)
                    pre = " until ";
                else
                    pre = " on ";

                string companyName = job.Company.CompanyName;
                string fullJobName = job.JobName + "@" + companyName;
                email_li += " <li> <b>" + fullJobName + ": </b> " + job.Status.ToString() + pre + job.Deadline.Value.ToString("dddd, dd MMMM yyyy HH:mm") + "</li> ";

                if(job.Notes != null && job.Notes.Any(x => char.IsLetter(x)))
                {
                    email_li += " <p> &emsp;&emsp;&emsp;" + job.Notes.ToString() + " </p>";
                }
            }

            return $@"
                
                <h3> Hello there, </h3>
                <p> You have {jobs.Count} upcoming deadline(s): </p>
                
                <ol>
                    {email_li}
                </ol>

            ";
        }

        public async Task SendDeadlineNotificationEmails()
        {
            var no_users = await _userManager.Users.CountAsync();
            
            var currTime = DateTime.Now;

            var timeLimit = DateTime.Now.AddDays(3);

            var step = 20;
            for(var start = 0; start < no_users; start += step)
            {
                var users = await _userManager.Users.Skip(start).Take(step).ToListAsync();

                foreach(var user in users)
                {
                    var jobs = await _dbContext.Jobs.Where(j => j.UserId == user.Id && j.Deadline.HasValue && j.Deadline>currTime && j.Deadline < timeLimit && (j.Status == ApplicationStatus.Interview || j.Status == ApplicationStatus.OnlineAssignment)).Include(p => p.Company).ToListAsync();

                    if (jobs.Any())
                    {
                        BackgroundJob.Enqueue(() => _emailSender.SendEmailAsync(user.Email, "Job Applications Deadline Reminders ", GetNotificationEmailHTML(jobs)));
                    }
                }

            }
        }
    }
}
