import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

export const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

/**
 * Send feedback request email to client
 */
export async function sendFeedbackRequestEmail({
  to,
  clientName,
  projectName,
  feedbackUrl,
  senderName,
}: {
  to: string;
  clientName: string;
  projectName: string;
  feedbackUrl: string;
  senderName: string;
}) {
  const subject = `We'd love your feedback on ${projectName}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Feedback Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <!-- Header -->
  <div style="text-align: center; margin-bottom: 40px;">
    <div style="background: #0052FF; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: 600; font-size: 14px;">
      ratee.me
    </div>
  </div>

  <!-- Main Content -->
  <div style="background: #ffffff; border: 2px solid #e5e7eb; border-radius: 12px; padding: 32px; margin-bottom: 24px;">
    <h1 style="color: #1f2937; font-size: 28px; margin: 0 0 16px 0; font-weight: 700;">
      Hi ${clientName}! 👋
    </h1>

    <p style="color: #4b5563; font-size: 16px; margin: 0 0 24px 0;">
      We hope you're happy with <strong>${projectName}</strong>. Your feedback would mean the world to us!
    </p>

    <p style="color: #4b5563; font-size: 16px; margin: 0 0 24px 0;">
      It'll only take <strong>2 minutes</strong> to share your thoughts. Your honest feedback helps us improve and deliver better results.
    </p>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 32px 0;">
      <a href="${feedbackUrl}" style="background: #0052FF; color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0, 82, 255, 0.2);">
        Share Your Feedback
      </a>
    </div>

    <p style="color: #6b7280; font-size: 14px; margin: 24px 0 0 0; text-align: center;">
      Or copy this link: <a href="${feedbackUrl}" style="color: #0052FF; word-break: break-all;">${feedbackUrl}</a>
    </p>
  </div>

  <!-- What to Expect -->
  <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
    <h2 style="color: #1f2937; font-size: 16px; margin: 0 0 12px 0; font-weight: 600;">
      What to expect:
    </h2>
    <ul style="color: #4b5563; font-size: 14px; margin: 0; padding-left: 20px;">
      <li style="margin-bottom: 8px;">Rate your experience on a scale of 0-10</li>
      <li style="margin-bottom: 8px;">Share what we did well or could improve</li>
      <li>Takes less than 2 minutes</li>
    </ul>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
    <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0;">
      This feedback request was sent by <strong>${senderName}</strong>
    </p>
    <p style="color: #9ca3af; font-size: 12px; margin: 0;">
      Powered by <a href="https://ratee.me" style="color: #0052FF; text-decoration: none; font-weight: 600;">ratee.me</a> - Client Feedback Automation
    </p>
  </div>

</body>
</html>
  `.trim();

  const text = `
Hi ${clientName}!

We hope you're happy with ${projectName}. Your feedback would mean the world to us!

It'll only take 2 minutes to share your thoughts. Your honest feedback helps us improve and deliver better results.

Share your feedback here:
${feedbackUrl}

What to expect:
- Rate your experience on a scale of 0-10
- Share what we did well or could improve
- Takes less than 2 minutes

This feedback request was sent by ${senderName}

---
Powered by ratee.me - Client Feedback Automation
  `.trim();

  if (!resend) {
    console.error("RESEND_API_KEY is not set");
    return { success: false, error: new Error("Email service not configured") };
  }

  try {
    const result = await resend.emails.send({
      from: "Ratee.me <noreply@ratee.me>", // Change to your verified domain
      to,
      subject,
      html,
      text,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
