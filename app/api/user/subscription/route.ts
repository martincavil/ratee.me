import { NextResponse } from 'next/server';
import { requireAuth, getUser } from '@/lib/supabase/auth';
import { createClient } from '@/lib/supabase/server';
import { ADMIN_EMAILS } from '@/lib/constants';

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

    // Check if user is admin - admins get PRO automatically
    const isAdmin = user.email && ADMIN_EMAILS.includes(user.email as typeof ADMIN_EMAILS[number]);

    if (isAdmin) {
      // Return PRO subscription for admin
      return NextResponse.json({
        success: true,
        data: {
          user_id: user.id,
          plan: 'pro',
          status: 'active',
          is_admin_override: true,
        },
      });
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
      data: data || { plan: 'free' },
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
