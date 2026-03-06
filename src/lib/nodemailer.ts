import nodemailer from 'nodemailer';

// Use Ethereal Email for testing (mock email in development)
// In production, you would use actual SMTP credentials
export async function sendRSVPEmail(toEmail: string, eventName: string, studentName: string) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const info = await transporter.sendMail({
            from: `"CampusHub Events" <${process.env.GMAIL_USER}>`,
            to: toEmail,
            subject: `RSVP Confirmed: ${eventName} 🎉`,
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f9; color: #333;">
          <h2 style="color: #4f46e5;">CampusHub Confirmation</h2>
          <p>Hi ${studentName},</p>
          <p>You have successfully RSVP'd to <strong>${eventName}</strong>.</p>
          <p>Please check your student dashboard closer to the date for any rule updates or fee payment links.</p>
          <br/>
          <p>Best regards,<br/>The CampusHub Team</p>
        </div>
      `,
        });

        console.log("Message sent: %s", info.messageId);

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending RSVP email:", error);
        return { success: false, error };
    }
}
