import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { signupSchema } from '@/lib/validators';
import type { ApiResponse, AuthResponse } from '@/types/api';
import { sendNewUserRegistrationNotification } from '@/lib/email';

/**
 * POST /api/auth/signup
 * Create a new user account
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validated = signupSchema.parse(body);

    const supabase = await createClient();

    // Sign up user with Supabase Auth
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: validated.email,
      password: validated.password,
      options: {
        data: {
          name: validated.name,
          company_name: validated.company_name || null,
        },
      },
    });

    if (signUpError) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: signUpError.message,
        },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Failed to create user',
        },
        { status: 500 }
      );
    }

    // If no session (email confirmation required), return success with flag
    if (!authData.session) {
      return NextResponse.json<ApiResponse>(
        {
          success: true,
          emailConfirmationRequired: true,
        },
        { status: 201 }
      );
    }

    // Get user profile from database (created by trigger)
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    // Send notification email to admin (don't block the response)
    sendNewUserRegistrationNotification({
      userEmail: authData.user.email!,
      userName: profile?.name || validated.name,
      companyName: profile?.company_name || undefined,
      language: 'fr',
    }).catch((error) => {
      console.error('Failed to send registration notification:', error);
    });

    const response: ApiResponse<AuthResponse> = {
      success: true,
      data: {
        user: {
          id: authData.user.id,
          email: authData.user.email!,
          name: profile?.name || validated.name,
          company_name: profile?.company_name || undefined,
        },
        session: {
          access_token: authData.session.access_token,
          expires_in: authData.session.expires_in,
        },
      },
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
