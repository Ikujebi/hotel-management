import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { createBooking, updateHotelRoom } from '@/libs/apis';
import type { BookingMetadata } from '@/types/stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

const CHECKOUT_SESSION_COMPLETED = 'checkout.session.completed';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return new NextResponse('Missing Stripe signature or webhook secret', {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, {
      status: 400,
    });
  }

  switch (event.type) {
    case CHECKOUT_SESSION_COMPLETED: {
      const session = event.data.object as Stripe.Checkout.Session;

      const metadata = session.metadata as BookingMetadata | null;

      if (!metadata) {
        return new NextResponse('Missing booking metadata', {
          status: 400,
        });
      }

      const {
        adults,
        children,
        checkInDate,
        checkOutDate,
        hotelRoom,
        numberOfDays,
        user,
        discount,
        totalPrice,
      } = metadata;

      await createBooking({
        adults: Number(adults),
        children: children ? Number(children) : 0,
        checkinDate: checkInDate,
        checkoutDate: checkOutDate,
        hotelRoom,
        numberOfDays: Number(numberOfDays),
        discount: Number(discount),
        totalPrice: Number(totalPrice),
        user,
      });

      await updateHotelRoom(hotelRoom);

      return NextResponse.json(
        { message: 'Booking successful' },
        { status: 200 }
      );
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json(
    { received: true },
    { status: 200 }
  );
}
