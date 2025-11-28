import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      token,
      nps,
      whatWentWell,
      toImprove,
      willReturn,
      testimonial,
      allowPublish,
      publishOption,
      email,
      newsletter,
      starRatings,
    } = body;

    // Validate required fields
    if (
      typeof nps !== 'number' ||
      nps < 0 ||
      nps > 10 ||
      !whatWentWell ||
      !toImprove ||
      !willReturn
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tous les champs obligatoires doivent être remplis',
        },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Validate token and get project info
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('*, users!inner(email, name)')
      .eq('feedback_token', token)
      .single();

    if (projectError || !project) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lien invalide ou expiré',
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
          error: 'Un feedback a déjà été soumis pour ce projet',
        },
        { status: 400 }
      );
    }

    // Create feedback
    const { data: feedback, error: feedbackError } = await supabase
      .from('feedbacks')
      .insert({
        project_id: project.id,
        feedback_token: token,
        client_name: project.client_name,
        email: project.client_email,
        nps_score: nps,
        what_went_well: whatWentWell,
        to_improve: toImprove,
        will_return: willReturn,
        testimonial: testimonial || null,
        allow_publish: allowPublish || false,
        publish_option: publishOption || 'no',
        respondent_email: email || null,
        want_newsletter: newsletter || false,
        star_rating_communication: starRatings?.communication || null,
        star_rating_deadlines: starRatings?.deadlines || null,
        star_rating_quality: starRatings?.quality || null,
        star_rating_professionalism: starRatings?.professionalism || null,
        star_rating_recommendation: starRatings?.recommendation || null,
      })
      .select()
      .single();

    if (feedbackError) {
      console.error('Feedback creation error:', feedbackError);
      return NextResponse.json(
        {
          success: false,
          error: 'Erreur lors de la création du feedback',
        },
        { status: 500 }
      );
    }

    // Update project feedback_status to 'received'
    await supabase
      .from('projects')
      .update({ feedback_status: 'received' })
      .eq('id', project.id);

    // TODO: Send confirmation email to respondent if email provided
    // TODO: Send notification email to freelancer

    return NextResponse.json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    console.error('Submit feedback error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Une erreur est survenue',
      },
      { status: 500 }
    );
  }
}
