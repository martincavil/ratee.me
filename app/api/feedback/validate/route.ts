import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: 'Token manquant',
        },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Get project by token
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, name, client_name, client_email, feedback_token, feedback_status')
      .eq('feedback_token', token)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lien invalide ou expire',
        },
        { status: 404 }
      );
    }

    // Check if feedback already submitted for this token
    const { data: existingFeedback } = await supabase
      .from('feedbacks')
      .select('id')
      .eq('feedback_token', token)
      .maybeSingle();

    if (existingFeedback) {
      return NextResponse.json(
        {
          success: false,
          error: 'Un feedback a deja ete soumis pour ce projet',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: project.id,
        name: project.name,
        client_name: project.client_name,
        client_email: project.client_email,
      },
    });
  } catch (error) {
    console.error('Validate token error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Une erreur est survenue',
      },
      { status: 500 }
    );
  }
}
