import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { ApiResponse } from '@/types/api';

/**
 * POST /api/auth/logout
 * Sign out the current user
 */
export async function POST() {
  try {
    const supabase = await createClient();

    // Sign out user
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    const response: ApiResponse = {
      success: true,
      message: 'Logged out successfully',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
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
