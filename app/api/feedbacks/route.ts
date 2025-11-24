import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/supabase/auth';
import { getFeedbacks } from '@/lib/supabase/queries';

export async function GET(request: NextRequest) {
  try {
    await requireAuth();

    const searchParams = request.nextUrl.searchParams;
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : 20;
    const offset = searchParams.get('offset')
      ? parseInt(searchParams.get('offset')!)
      : 0;
    const projectId = searchParams.get('projectId') || undefined;

    const result = await getFeedbacks({
      projectId,
      limit,
      offset,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Feedbacks error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch feedbacks',
      },
      { status: 500 }
    );
  }
}
