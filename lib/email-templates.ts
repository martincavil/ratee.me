/**
 * Email templates avec support i18n (FR/EN)
 */

export type Language = 'fr' | 'en';

interface EmailContent {
  subject: string;
  greeting: string;
  intro: string;
  cta: string;
  ctaButton: string;
  whatToExpect: {
    title: string;
    steps: string[];
  };
  footer: {
    sentBy: string;
    poweredBy: string;
  };
}

const translations: Record<Language, EmailContent> = {
  fr: {
    subject: "Votre avis sur {projectName} nous intéresse",
    greeting: "Bonjour {clientName} ! 👋",
    intro: "Nous espérons que vous êtes satisfait de <strong>{projectName}</strong>. Votre retour est précieux pour nous !",
    cta: "Cela ne prendra que <strong>2 minutes</strong> pour partager votre avis. Votre feedback sincère nous aide à nous améliorer et à offrir de meilleurs résultats.",
    ctaButton: "Donner mon avis",
    whatToExpect: {
      title: "À quoi s'attendre :",
      steps: [
        "Noter votre expérience sur une échelle de 0 à 10",
        "Partager ce qui a bien fonctionné ou ce qui pourrait être amélioré",
        "Moins de 2 minutes chrono"
      ]
    },
    footer: {
      sentBy: "Cette demande a été envoyée par <strong>{senderName}</strong>",
      poweredBy: "Propulsé par"
    }
  },
  en: {
    subject: "We'd love your feedback on {projectName}",
    greeting: "Hi {clientName}! 👋",
    intro: "We hope you're happy with <strong>{projectName}</strong>. Your feedback would mean the world to us!",
    cta: "It'll only take <strong>2 minutes</strong> to share your thoughts. Your honest feedback helps us improve and deliver better results.",
    ctaButton: "Share Your Feedback",
    whatToExpect: {
      title: "What to expect:",
      steps: [
        "Rate your experience on a scale of 0-10",
        "Share what we did well or could improve",
        "Takes less than 2 minutes"
      ]
    },
    footer: {
      sentBy: "This feedback request was sent by <strong>{senderName}</strong>",
      poweredBy: "Powered by"
    }
  }
};

function replacePlaceholders(text: string, vars: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (_, key) => vars[key] || '');
}

export function getFeedbackEmailContent(params: {
  language: Language;
  clientName: string;
  projectName: string;
  feedbackUrl: string;
  senderName: string;
}) {
  const { language, clientName, projectName, feedbackUrl, senderName } = params;
  const t = translations[language];

  const vars = { clientName, projectName, senderName };

  const subject = replacePlaceholders(t.subject, vars);
  const greeting = replacePlaceholders(t.greeting, vars);
  const intro = replacePlaceholders(t.intro, vars);
  const cta = replacePlaceholders(t.cta, vars);
  const ctaButton = t.ctaButton;
  const whatToExpect = t.whatToExpect;
  const footer = {
    sentBy: replacePlaceholders(t.footer.sentBy, vars),
    poweredBy: t.footer.poweredBy
  };

  // HTML Email Template
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">

  <!-- Container -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Main Content -->
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 40px; text-align: center;">
              <div style="background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); color: white; padding: 12px 24px; border-radius: 24px; display: inline-block; font-weight: 700; font-size: 16px; letter-spacing: 0.5px;">
                ratee.me
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 48px 40px;">
              <h1 style="color: #111827; font-size: 32px; margin: 0 0 24px 0; font-weight: 700; line-height: 1.2;">
                ${greeting}
              </h1>

              <p style="color: #4b5563; font-size: 17px; line-height: 1.6; margin: 0 0 24px 0;">
                ${intro}
              </p>

              <p style="color: #4b5563; font-size: 17px; line-height: 1.6; margin: 0 0 36px 0;">
                ${cta}
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 0 0 36px 0;">
                    <a href="${feedbackUrl}" style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: white; text-decoration: none; padding: 18px 48px; border-radius: 12px; font-weight: 600; font-size: 17px; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3); transition: all 0.3s ease;">
                      ${ctaButton}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Alternative Link -->
              <p style="color: #9ca3af; font-size: 14px; text-align: center; margin: 0 0 36px 0; word-break: break-all;">
                ${language === 'fr' ? 'Ou copiez ce lien' : 'Or copy this link'}:
                <br/>
                <a href="${feedbackUrl}" style="color: #10B981; text-decoration: none;">${feedbackUrl}</a>
              </p>
            </td>
          </tr>

          <!-- What to Expect -->
          <tr>
            <td style="padding: 0 40px 48px 40px;">
              <div style="background: #f3f4f6; border-radius: 12px; padding: 28px;">
                <h2 style="color: #111827; font-size: 18px; margin: 0 0 16px 0; font-weight: 600;">
                  ${whatToExpect.title}
                </h2>
                <ul style="color: #4b5563; font-size: 15px; margin: 0; padding-left: 24px; line-height: 1.8;">
                  ${whatToExpect.steps.map(step => `<li style="margin-bottom: 8px;">${step}</li>`).join('')}
                </ul>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 32px 40px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 0 0 12px 0; line-height: 1.5;">
                ${footer.sentBy}
              </p>
              <p style="color: #9ca3af; font-size: 13px; text-align: center; margin: 0;">
                ${footer.poweredBy} <a href="https://ratee.me" style="color: #10B981; text-decoration: none; font-weight: 600;">ratee.me</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();

  // Plain text version
  const text = `
${greeting}

${intro.replace(/<\/?strong>/g, '')}

${cta.replace(/<\/?strong>/g, '')}

${ctaButton}: ${feedbackUrl}

${whatToExpect.title}
${whatToExpect.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

---
${footer.sentBy.replace(/<\/?strong>/g, '')}
${footer.poweredBy} ratee.me - https://ratee.me
  `.trim();

  return { subject, html, text };
}
