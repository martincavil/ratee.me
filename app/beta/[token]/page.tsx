import Link from 'next/link';
import { createAdminClient } from '@/lib/supabase/admin';

interface Props {
  params: Promise<{ token: string }>;
}

export default async function BetaRedemptionPage({ params }: Props) {
  const { token } = await params;
  const supabase = createAdminClient();

  // 1. Validate token
  const { data: invite, error: inviteError } = await supabase
    .from('beta_invites')
    .select('*')
    .eq('token', token)
    .single();

  if (inviteError || !invite) {
    return <ErrorPage message="Lien invalide ou expire" />;
  }

  // 2. Check status
  if (invite.status !== 'pending') {
    return <ErrorPage message="Ce lien a deja ete utilise" />;
  }

  // 3. Check expiration
  if (new Date(invite.expires_at) < new Date()) {
    return <ErrorPage message="Ce lien a expire" />;
  }

  // 4. Check if user already exists
  const { data: existingUser } = await supabase.auth.admin.listUsers();
  const userExists = existingUser?.users?.some(u => u.email === invite.email);

  if (userExists) {
    // Mark invite as used and redirect to login
    await supabase
      .from('beta_invites')
      .update({ status: 'used', used_at: new Date().toISOString() })
      .eq('token', token);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">👋</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tu as deja un compte!</h1>
          <p className="text-gray-600 mb-6">
            Un compte existe deja avec cet email. Connecte-toi pour continuer.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all"
          >
            Se connecter
          </Link>
        </div>
      </div>
    );
  }

  // 5. Create account
  const tempPassword = generateSecurePassword();
  const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
    email: invite.email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: {
      name: invite.email.split('@')[0],
    },
  });

  if (authError || !authUser.user) {
    console.error('Beta signup auth error:', authError);
    return <ErrorPage message="Erreur lors de la creation du compte" />;
  }

  // 6. Create subscription with 30-day trial
  const trialUntil = new Date();
  trialUntil.setDate(trialUntil.getDate() + (invite.trial_duration_days || 30));

  const { error: subError } = await supabase.from('subscriptions').insert({
    user_id: authUser.user.id,
    plan: 'pro',
    status: 'active',
    trial_until: trialUntil.toISOString(),
    current_period_start: new Date().toISOString(),
    current_period_end: trialUntil.toISOString(),
  });

  if (subError) {
    console.error('Beta signup subscription error:', subError);
  }

  // 7. Mark invite as used
  await supabase
    .from('beta_invites')
    .update({
      status: 'used',
      used_at: new Date().toISOString(),
      trial_started_at: new Date().toISOString(),
    })
    .eq('token', token);

  // 8. Update waitlist status if exists
  await supabase
    .from('waitlist')
    .update({ status: 'converted' })
    .eq('email', invite.email);

  // 9. Show success page with auto-redirect
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">✨</div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Bienvenue!
        </h1>

        <p className="text-gray-600 mb-2">
          Ton compte est cree et tu as acces a ratee.me pendant <strong>30 jours gratuitement</strong>.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Ton mot de passe temporaire:</strong>
            <br />
            <code className="bg-yellow-100 px-2 py-1 rounded text-sm">{tempPassword}</code>
          </p>
          <p className="text-xs text-yellow-600 mt-2">
            Pense a le changer dans les parametres de ton compte.
          </p>
        </div>

        <Link
          href="/auth/login"
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all"
        >
          Se connecter maintenant
        </Link>
      </div>
    </div>
  );
}

function ErrorPage({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">❌</div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {message}
        </h1>

        <p className="text-gray-500 mb-6">
          Si tu penses qu'il s'agit d'une erreur, contacte-nous.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour a l'accueil
        </Link>
      </div>
    </div>
  );
}

function generateSecurePassword(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password + 'Aa1!';
}
