import { NextResponse } from 'next/server';
import { requireAuth, getUser } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    await requireAuth();
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 is "not found" error
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: data || null,
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch subscription',
      },
      { status: 500 }
    );
  }
}
