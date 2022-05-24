using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobTracker.Core.Services
{
    public interface IDeadlineNotificationService
    {
        Task SendDeadlineNotificationEmails();

    }
}
