import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase/auth';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    // Vérifier que l'utilisateur est admin
    await requireAdmin();

    const { emails } = await request.json();

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Emails array is required' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const links: string[] = [];

    for (const email of emails) {
      // Générer un token unique
      const token = generateToken(32);

      // Définir la date d'expiration (7 jours)
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      // Insérer dans beta_invites
      const { error } = await supabase.from('beta_invites').insert({
        email,
        token,
        status: 'pending',
        expires_at: expiresAt.toISOString(),
        trial_duration_days: 30,
      });

      if (!error) {
        // Générer le lien
        const origin = request.headers.get('origin') || 'http://localhost:3000';
        links.push(`${origin}/beta/${token}`);

        // Mettre à jour le statut dans la waitlist
        await supabase
          .from('waitlist')
          .update({ status: 'beta_invited' })
          .eq('email', email);
      }
    }

    return NextResponse.json({
      success: true,
      data: { links, count: links.length },
    });
  } catch (error) {
    console.error('Beta invite error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create beta invites' },
      { status: 500 }
    );
  }
}

function generateToken(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
