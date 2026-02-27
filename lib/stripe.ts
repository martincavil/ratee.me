import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-11-17.clover',
    });
  }
  return stripeInstance;
}

// For backwards compatibility
export const stripe = {
  get customers() { return getStripe().customers; },
  get checkout() { return getStripe().checkout; },
  get webhooks() { return getStripe().webhooks; },
};

export const STRIPE_PRICES = {
  FREE: process.env.STRIPE_PRICE_FREE,
  PRO_MONTHLY: process.env.STRIPE_PRICE_PRO_MONTHLY,
  PRO_YEARLY: process.env.STRIPE_PRICE_PRO_YEARLY,
  PRO_MONTHLY_USD: process.env.STRIPE_PRICE_PRO_MONTHLY_USD,
  PRO_YEARLY_USD: process.env.STRIPE_PRICE_PRO_YEARLY_USD,
};
