import stripe from "stripe";
import { Request, Response } from "express";

const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-04-10",
});

export async function checkoutStripe(req: Request, res: Response) {
  const { amount } = req.body;
  console.log("oi")

  try {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(400).send({
      error: {
        message: (error as any).message,
      },
    });
  }
}
