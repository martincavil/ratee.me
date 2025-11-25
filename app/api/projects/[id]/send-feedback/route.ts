import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/supabase/auth';
import { getProjectById, updateProject } from '@/lib/supabase/queries';
import { sendFeedbackRequestEmail } from '@/lib/email';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(_request: Request, { params }: RouteParams) {
  try {
    const user = await requireAuth();
    const { id } = await params;

    // Get project
    const project = await getProjectById(id);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: 'Project not found',
        },
        { status: 404 }
      );
    }

    // Verify project belongs to user
    if (project.user_id !== user.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 403 }
      );
    }

    // Check if client email exists
    if (!project.client_email) {
      return NextResponse.json(
        {
          success: false,
          error: 'Client email is required to send feedback request',
        },
        { status: 400 }
      );
    }

    // Check if feedback was already received (can't resend if received)
    if (project.feedback_status === 'received') {
      return NextResponse.json(
        {
          success: false,
          error: 'Feedback has already been received for this project',
        },
        { status: 400 }
      );
    }

    // Allow resending if status is "sent" (useful for testing)

    // Generate feedback URL
    const feedbackUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/feedback/${project.feedback_token}`;

    // Get sender name from user
    const senderName = user.user_metadata?.full_name || user.email || 'Your partner';

    // Send email
    const emailResult = await sendFeedbackRequestEmail({
      to: project.client_email,
      clientName: project.client_name,
      projectName: project.name,
      feedbackUrl,
      senderName,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send email. Please try again.',
        },
        { status: 500 }
      );
    }

    // Update project status to 'sent'
    await updateProject(id, {
      feedback_status: 'sent',
    });

    return NextResponse.json({
      success: true,
      message: 'Feedback request sent successfully',
    });
  } catch (error) {
    console.error('Send feedback error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
