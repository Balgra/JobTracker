using JobTracker.Core.Models;

namespace JobTracker.API.requests
{
    public class AddJobRequest
    {
        public string JobName { get; set; }
        public ApplicationStatus Status { get; set; }
        public int CompanyId { get; set; }
        public string? Notes { get; set; }
        public DateTime? Deadline { get; set; }
    }
}
