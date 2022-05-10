namespace JobTracker.Core.Models
{
    public class Company
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string? UserId { get; set; }
        public User? User { get; set; }
        public DateTime CreatedTimeUtc { get; set; }
        public DateTime? UpdatedTimeUtc { get; set; }
    }
}
