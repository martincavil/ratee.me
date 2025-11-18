import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/supabase/auth';
import { updateUserProfile } from '@/lib/supabase/queries';
import { updateProfileSchema } from '@/lib/validators';
import { ZodError } from 'zod';

export async function PUT(request: Request) {
  try {
    await requireAuth();
    const body = await request.json();

    const validated = updateProfileSchema.parse(body);
    const updatedUser = await updateUserProfile(validated);

    return NextResponse.json({
      success: true,
      data: { user: updatedUser },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      );
    }

    console.error('Profile update error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update profile',
      },
      { status: 500 }
    );
  }
}
