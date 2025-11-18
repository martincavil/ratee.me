import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/supabase/auth';
import { getBadgeStats } from '@/lib/supabase/queries';

export async function GET() {
  try {
    await requireAuth();
    const stats = await getBadgeStats();

    return NextResponse.json({
      success: true,
      data: { stats },
    });
  } catch (error) {
    console.error('Badge stats error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch badge stats',
      },
      { status: 500 }
    );
  }
}
