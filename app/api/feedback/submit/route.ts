import { NextResponse } from 'next/server';
import { getProjectByToken, createFeedback } from '@/lib/supabase/queries';
import { submitFeedbackSchema } from '@/lib/validators';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validated = submitFeedbackSchema.parse(body);

    // Verify token and get project
    const project = await getProjectByToken(validated.project_token);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid or expired feedback link',
        },
        { status: 404 }
      );
    }

    // Create feedback
    const feedback = await createFeedback({
      project_id: project.id,
      client_name: validated.client_name,
      client_email: validated.client_email,
      nps_score: validated.nps_score,
      comment: validated.comment,
    });

    return NextResponse.json({
      success: true,
      data: { feedback },
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

    console.error('Feedback submission error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit feedback',
      },
      { status: 500 }
    );
  }
}
