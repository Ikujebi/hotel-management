import { loadStripe, Stripe as StripeType } from '@stripe/stripe-js'

let stripePromise: Promise<StripeType | null>

export const getStripe = (): Promise<StripeType | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    )
  }
  return stripePromise
}
