import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendFreelancerFeedbackNotification } from '@/lib/email';
import { API_URL } from '@/lib/constants';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Support both old and new format
    const {
      // New format (from nps-form.tsx)
      project_token,
      nps_score,
      rating_communication,
      rating_quality,
      rating_deadlines,
      rating_value,
      rating_overall,
      client_name,
      client_email,
      comment,
      // Old format (legacy)
      token: legacyToken,
      nps: legacyNps,
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

    // Use new format if available, otherwise use legacy format
    const token = project_token || legacyToken;
    const nps = nps_score ?? legacyNps;

    // Validate required fields
    if (
      typeof nps !== 'number' ||
      nps < 0 ||
      nps > 10 ||
      !token
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

    // Create feedback (support both old and new format)
    const { data: feedback, error: feedbackError } = await supabase
      .from('feedbacks')
      .insert({
        project_id: project.id,
        feedback_token: token,
        client_name: client_name || project.client_name,
        email: client_email || project.client_email,
        nps_score: nps,
        // New format fields
        comment: comment || null,
        // Old format fields (legacy)
        what_went_well: whatWentWell || null,
        to_improve: toImprove || null,
        will_return: willReturn || null,
        testimonial: testimonial || null,
        allow_publish: allowPublish || false,
        publish_option: publishOption || 'no',
        respondent_email: email || null,
        want_newsletter: newsletter || false,
        // Star ratings (new format takes priority)
        star_rating_communication: rating_communication ?? starRatings?.communication ?? null,
        star_rating_deadlines: rating_deadlines ?? starRatings?.deadlines ?? null,
        star_rating_quality: rating_quality ?? starRatings?.quality ?? null,
        star_rating_value: rating_value ?? null,
        star_rating_professionalism: starRatings?.professionalism ?? null,
        star_rating_recommendation: rating_overall ?? starRatings?.recommendation ?? null,
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

    // Send notification email to freelancer
    try {
      const freelancerEmail = project.users.email;
      const freelancerName = project.users.name || 'there';
      const dashboardUrl = `${API_URL}/dashboard/feedbacks`;

      await sendFreelancerFeedbackNotification({
        to: freelancerEmail,
        freelancerName,
        clientName: client_name || project.client_name,
        projectName: project.name,
        npsScore: nps,
        comment: comment || testimonial,
        dashboardUrl,
        language: 'fr', // TODO: Detect user language from profile
      });

    } catch (emailError) {
      // Log error but don't fail the feedback submission
      console.error('⚠️ Failed to send freelancer notification email:', emailError);
    }

    // TODO: Send confirmation email to respondent if email provided

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
