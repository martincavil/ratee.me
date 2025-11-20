import { createAdminClient } from '@/lib/supabase/admin';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email templates
const templates = {
  onboarding: {
    subject: 'Ton avis sur [ProjectName]? (30 sec)',
    body: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <p>Salut [ClientName],</p>

    <p>La mission <strong>[ProjectName]</strong> est terminee! 🎉</p>

    <p>On aimerait connaitre ton avis:</p>
    <ul>
      <li>Comment ca s'est passe?</li>
      <li>Quelle note donnerais-tu (0-10)?</li>
      <li>Un commentaire?</li>
    </ul>

    <p style="text-align: center; margin: 30px 0;">
      <a href="[FeedbackLink]" class="button">Donner mon avis (1 min)</a>
    </p>

    <p>Merci!</p>
    <p><strong>[FreelanceName]</strong></p>

    <div class="footer">
      <p>Envoye via ratee.me - Automatise ton suivi client</p>
    </div>
  </div>
</body>
</html>
`,
  },
  '30_days_followup': {
    subject: 'Comment ca se passe avec [ProjectName]?',
    body: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <p>Salut [ClientName],</p>

    <p>Un mois a passe depuis qu'on a livre <strong>[ProjectName]</strong>.</p>

    <p>Ca tourne bien? Des questions? Tu veux des ameliorations?</p>

    <p>On aimerait avoir ton feedback mise-a-jour:</p>

    <p style="text-align: center; margin: 30px 0;">
      <a href="[FeedbackLink]" class="button">Mettre a jour mon avis</a>
    </p>

    <p>Merci,</p>
    <p><strong>[FreelanceName]</strong></p>

    <div class="footer">
      <p>Envoye via ratee.me</p>
    </div>
  </div>
</body>
</html>
`,
  },
  '90_days_reminder': {
    subject: 'On pense a toi! 😊',
    body: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .button { display: inline-block; background: #3B82F6; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <p>Salut [ClientName],</p>

    <p>3 mois maintenant depuis <strong>[ProjectName]</strong>! Comment ca se passe?</p>

    <p>Si tu es heureux, on aimerait que tu nous recommandes 🙌</p>

    <p style="text-align: center; margin: 30px 0;">
      <a href="[FeedbackLink]" class="button">Donner mon avis</a>
    </p>

    <p>On peut aussi discuter d'une suite de projet...</p>

    <p>Cheers,</p>
    <p><strong>[FreelanceName]</strong></p>

    <div class="footer">
      <p>Envoye via ratee.me</p>
    </div>
  </div>
</body>
</html>
`,
  },
};

type EmailType = 'onboarding' | '30_days_followup' | '90_days_reminder';

export async function sendAutomatedEmail(
  projectId: string,
  emailType: EmailType
): Promise<{ success: boolean; error?: string }> {
  const supabase = createAdminClient();

  // 1. Get project with user info
  const { data: project, error: projectError } = await supabase
    .from('projects')
    .select('*, users(*)')
    .eq('id', projectId)
    .single();

  if (projectError || !project) {
    return { success: false, error: 'Project not found' };
  }

  if (!project.client_email) {
    return { success: false, error: 'No client email' };
  }

  // 2. Check if user has PRO plan
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', project.user_id)
    .single();

  if (!subscription || subscription.plan !== 'pro') {
    return { success: false, error: 'User is not PRO' };
  }

  // 3. Get template
  const template = templates[emailType];
  if (!template) {
    return { success: false, error: 'Template not found' };
  }

  // 4. Generate feedback link
  const feedbackToken = project.id; // Simple: use project ID as token
  const feedbackLink = `${process.env.NEXT_PUBLIC_SITE_URL}/feedback/${feedbackToken}`;

  // 5. Prepare email
  const subject = template.subject
    .replace('[ProjectName]', project.name);

  const html = template.body
    .replace(/\[ClientName\]/g, project.client_name)
    .replace(/\[ProjectName\]/g, project.name)
    .replace(/\[FreelanceName\]/g, project.users?.name || 'L\'equipe')
    .replace(/\[FeedbackLink\]/g, feedbackLink);

  // 6. Send email
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@ratee.me',
      to: project.client_email,
      subject,
      html,
    });

    // 7. Log success
    await supabase.from('email_automations').insert({
      project_id: projectId,
      user_id: project.user_id,
      email_type: emailType,
      client_email: project.client_email,
      client_name: project.client_name,
      sent_at: new Date().toISOString(),
      status: 'sent',
    });

    // 8. Update project automation flags
    const updateField = `automation_${emailType.replace('_days_', 'days')}_sent`;
    await supabase
      .from('projects')
      .update({ [updateField]: true })
      .eq('id', projectId);

    return { success: true };
  } catch (error) {
    // Log failure
    await supabase.from('email_automations').insert({
      project_id: projectId,
      user_id: project.user_id,
      email_type: emailType,
      client_email: project.client_email,
      client_name: project.client_name,
      status: 'failed',
      error_message: error instanceof Error ? error.message : 'Unknown error',
    });

    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function processAutomatedEmails(): Promise<{
  onboarding: number;
  followup30: number;
  reminder90: number;
  errors: string[];
}> {
  const supabase = createAdminClient();
  const results = {
    onboarding: 0,
    followup30: 0,
    reminder90: 0,
    errors: [] as string[],
  };

  // Get today's date range
  const today = new Date();
  const todayStart = new Date(today.setHours(0, 0, 0, 0)).toISOString();
  const todayEnd = new Date(today.setHours(23, 59, 59, 999)).toISOString();

  // Type 1: Onboarding - projects completed today
  const { data: onboardingProjects } = await supabase
    .from('projects')
    .select('id')
    .gte('completed_at', todayStart)
    .lte('completed_at', todayEnd)
    .eq('automation_onboarding_sent', false);

  for (const project of onboardingProjects || []) {
    const result = await sendAutomatedEmail(project.id, 'onboarding');
    if (result.success) {
      results.onboarding++;
    } else if (result.error) {
      results.errors.push(`Onboarding ${project.id}: ${result.error}`);
    }
  }

  // Type 2: 30-day followup
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const thirtyStart = new Date(thirtyDaysAgo.setHours(0, 0, 0, 0)).toISOString();
  const thirtyEnd = new Date(thirtyDaysAgo.setHours(23, 59, 59, 999)).toISOString();

  const { data: followup30Projects } = await supabase
    .from('projects')
    .select('id')
    .gte('completed_at', thirtyStart)
    .lte('completed_at', thirtyEnd)
    .eq('automation_30days_sent', false);

  for (const project of followup30Projects || []) {
    const result = await sendAutomatedEmail(project.id, '30_days_followup');
    if (result.success) {
      results.followup30++;
    } else if (result.error) {
      results.errors.push(`30day ${project.id}: ${result.error}`);
    }
  }

  // Type 3: 90-day reminder
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
  const ninetyStart = new Date(ninetyDaysAgo.setHours(0, 0, 0, 0)).toISOString();
  const ninetyEnd = new Date(ninetyDaysAgo.setHours(23, 59, 59, 999)).toISOString();

  const { data: reminder90Projects } = await supabase
    .from('projects')
    .select('id')
    .gte('completed_at', ninetyStart)
    .lte('completed_at', ninetyEnd)
    .eq('automation_90days_sent', false);

  for (const project of reminder90Projects || []) {
    const result = await sendAutomatedEmail(project.id, '90_days_reminder');
    if (result.success) {
      results.reminder90++;
    } else if (result.error) {
      results.errors.push(`90day ${project.id}: ${result.error}`);
    }
  }

  return results;
}
