import { Resend } from "resend";
import { getFeedbackEmailContent, getWaitlistConfirmationEmailContent, getFreelancerFeedbackNotificationEmailContent, type Language } from "./email-templates";

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
  language = 'en',
}: {
  to: string;
  clientName: string;
  projectName: string;
  feedbackUrl: string;
  senderName: string;
  language?: Language;
}) {
  // Get translated content
  const { subject, html, text } = getFeedbackEmailContent({
    language,
    clientName,
    projectName,
    feedbackUrl,
    senderName,
  });

  if (!resend) {
    console.error("RESEND_API_KEY is not set");
    return { success: false, error: new Error("Email service not configured") };
  }

  try {
    // En mode développement, utiliser onboarding@resend.dev (domaine de test Resend)
    // En production, utiliser votre domaine vérifié
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    console.log("🔄 Sending email via Resend...", {
      from: fromEmail,
      to,
      subject,
      apiKey: process.env.RESEND_API_KEY?.substring(0, 10) + "..."
    });

    const result = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
      text,
    });

    console.log("✅ Email sent successfully:", {
      to,
      subject,
      from: fromEmail,
      resultId: result.data?.id,
      result
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return { success: false, error };
  }
}

/**
 * Send waitlist confirmation email
 */
export async function sendWaitlistConfirmationEmail({
  to,
  language = 'fr',
}: {
  to: string;
  language?: Language;
}) {
  // Get translated content
  const { subject, html, text } = getWaitlistConfirmationEmailContent({
    language,
  });

  if (!resend) {
    console.error("RESEND_API_KEY is not set");
    return { success: false, error: new Error("Email service not configured") };
  }

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    console.log("🔄 Sending waitlist confirmation email via Resend...", {
      from: fromEmail,
      to,
      subject,
    });

    const result = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
      text,
    });

    console.log("✅ Waitlist confirmation email sent successfully:", {
      to,
      subject,
      from: fromEmail,
      resultId: result.data?.id,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("❌ Failed to send waitlist confirmation email:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return { success: false, error };
  }
}

/**
 * Send notification email to freelancer when client submits feedback
 */
export async function sendFreelancerFeedbackNotification({
  to,
  freelancerName,
  clientName,
  projectName,
  npsScore,
  comment,
  dashboardUrl,
  language = 'fr',
}: {
  to: string;
  freelancerName: string;
  clientName: string;
  projectName: string;
  npsScore: number;
  comment?: string;
  dashboardUrl: string;
  language?: Language;
}) {
  // Get translated content
  const { subject, html, text } = getFreelancerFeedbackNotificationEmailContent({
    language,
    freelancerName,
    clientName,
    projectName,
    npsScore,
    comment,
    dashboardUrl,
  });

  if (!resend) {
    console.error("RESEND_API_KEY is not set");
    return { success: false, error: new Error("Email service not configured") };
  }

  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    console.log("🔄 Sending freelancer feedback notification via Resend...", {
      from: fromEmail,
      to,
      subject,
    });

    const result = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
      text,
    });

    console.log("✅ Freelancer notification email sent successfully:", {
      to,
      subject,
      from: fromEmail,
      resultId: result.data?.id,
    });
    return { success: true, data: result };
  } catch (error) {
    console.error("❌ Failed to send freelancer notification email:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return { success: false, error };
  }
}
