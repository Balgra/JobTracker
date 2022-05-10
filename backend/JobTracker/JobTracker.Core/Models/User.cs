using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobTracker.Core.Models
{
    public class User : IdentityUser
    {
        public DateTime CreatedTimeUtc { get; set; }
        public DateTime? UpdatedTimeUtc { get; set; }
        public string? Interests { get; set; }
        public uint ReminderDaysBefore { get; set; } = 0;

    }
}
