import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { loginSchema } from '@/lib/validators';
import type { ApiResponse, AuthResponse } from '@/types/api';

/**
 * POST /api/auth/login
 * Authenticate existing user
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validated = loginSchema.parse(body);

    const supabase = await createClient();

    // Sign in with email and password
    const { data: authData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: validated.email,
        password: validated.password,
      });

    if (signInError) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Invalid credentials',
        },
        { status: 401 }
      );
    }

    if (!authData.user || !authData.session) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: 'Authentication failed',
        },
        { status: 401 }
      );
    }

    // Get user profile from database
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    const response: ApiResponse<AuthResponse> = {
      success: true,
      data: {
        user: {
          id: authData.user.id,
          email: authData.user.email!,
          name: profile?.name || 'User',
          company_name: profile?.company_name || undefined,
        },
        session: {
          access_token: authData.session.access_token,
          expires_in: authData.session.expires_in,
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
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
