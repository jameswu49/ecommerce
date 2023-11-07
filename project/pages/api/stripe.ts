import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        try {

            const totalPrice = req.body.price * 100

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: "Sample Product",
                            },
                            unit_amount: totalPrice
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/`,
            });

            res.status(200).json({ sessionId: session.id });
        } catch (err) {
            res.status(500).json({ error: "Error creating checkout session" });
        }
    } else {
        res.setHeader("Allow", "POST");
        res.status(405).end("Method Not Allowed");
    }
}