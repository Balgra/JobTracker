using SendGrid;
using SendGrid.Helpers.Mail;


namespace JobTracker.Core.Services
{
    public class EmailSender : IEmailSender
    {
        public async Task<bool> SendEmailAsync(string to, string subject, string htmlMessage)
        {
            var senderAddress = new EmailAddress()
            { Name = "Job Tracker Platform", Email = "jobtracker-no-reply@adelinchis.ro" };
            var msg = GetMessage(senderAddress, subject, htmlMessage);
            msg.AddTo(new EmailAddress(to));
            var client = new SendGridClient("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");
            var response = await client.SendEmailAsync(msg);
            return response.IsSuccessStatusCode;
        }

        private static SendGridMessage GetMessage(EmailAddress emailAddress, string subject, string message)
        {
            return new SendGridMessage
            {
                From = emailAddress,
                Subject = subject,
                PlainTextContent = message,
                HtmlContent = message
            };
        }
    }

}
