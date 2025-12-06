import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { processAutomatedEmails } from '@/lib/email-automation';
import { ADMIN_EMAILS } from '@/lib/constants';

export async function POST(request: NextRequest) {
  // Check for cron secret or admin auth
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // Allow cron jobs with secret
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
    const result = await processAutomatedEmails();
    return NextResponse.json({
      success: true,
      message: 'Email automation executed',
      result,
    });
  }

  // Otherwise check for admin user
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !ADMIN_EMAILS.includes(user.email as typeof ADMIN_EMAILS[number])) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Execute automation
  const result = await processAutomatedEmails();

  return NextResponse.json({
    success: true,
    message: 'Email automation executed',
    result,
  });
}

// GET endpoint for Vercel Cron
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const result = await processAutomatedEmails();

  return NextResponse.json({
    success: true,
    message: 'Email automation executed via cron',
    result,
  });
}
