import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getStripe, STRIPE_PRICES } from '@/lib/stripe';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { interval = 'monthly' } = await request.json();

    // Get or create Stripe customer
    const adminClient = createAdminClient();
    const { data: subscription, error: subError } = await adminClient
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (subError) {
      throw new Error(`Failed to fetch subscription: ${subError.message}`);
    }

    let customerId = subscription?.stripe_customer_id;
    const stripe = getStripe();

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email!,
        metadata: { userId: user.id },
      });
      customerId = customer.id;

      // Update or create subscription with customer ID
      const { error: upsertError } = await adminClient
        .from('subscriptions')
        .upsert({
          user_id: user.id,
          stripe_customer_id: customerId,
          plan: 'free',
          status: 'active',
        }, {
          onConflict: 'user_id'
        });

      if (upsertError) {
        throw new Error(`Failed to save customer: ${upsertError.message}`);
      }
    }

    // Determine price based on interval
    const stripePriceId = interval === 'yearly'
      ? STRIPE_PRICES.PRO_YEARLY
      : STRIPE_PRICES.PRO_MONTHLY;

    if (!stripePriceId) {
      throw new Error('Stripe price ID is not configured');
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{
        price: stripePriceId,
        quantity: 1,
      }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      {
        error: 'Failed to create checkout session',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
