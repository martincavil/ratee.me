import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendWaitlistConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email', code: 'INVALID_EMAIL' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Check if email already exists
    const { data: existing } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email.toLowerCase().trim())
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Email already in waitlist', code: 'ALREADY_EXISTS' },
        { status: 409 }
      );
    }

    // Insert into waitlist
    const { error } = await supabase
      .from('waitlist')
      .insert({
        email: email.toLowerCase().trim(),
        status: 'waiting',
        source: 'landing',
      });

    if (error) {
      console.error('Waitlist insert error:', error);

      // Handle unique constraint violation
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'Email already in waitlist', code: 'ALREADY_EXISTS' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to join waitlist', code: 'DB_ERROR' },
        { status: 500 }
      );
    }

    // Send confirmation email (don't block response if email fails)
    sendWaitlistConfirmationEmail({
      to: email.toLowerCase().trim(),
      language: 'fr', // You could detect language from browser or let users choose
    }).catch((error) => {
      console.error('Failed to send waitlist confirmation email:', error);
      // Don't fail the request if email fails
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', code: 'SERVER_ERROR' },
      { status: 500 }
    );
  }
}
