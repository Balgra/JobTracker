using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobTracker.Core.Services
{
    public interface IEmailSender
    {
        Task<bool> SendEmailAsync(string to, string subject, string htmlMessage);
    }
}
