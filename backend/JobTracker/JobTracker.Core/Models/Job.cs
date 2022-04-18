using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobTracker.Core.Models
{
    public class Job
    {
        public int Id { get; set; }
        public string JobName { get; set; }
        public ApplicationStatus Status { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Updated { get; set; }
        public Company Company { get; set; }
        public int CompanyId { get; set; }
        public string? Notes { get; set; }
        public DateTime? Deadline { get; set; }


    }
}
