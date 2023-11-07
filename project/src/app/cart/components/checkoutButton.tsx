import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

async function handleCheckout(total, items, session, router) {
    try {
        const stripe = await stripePromise;

        const data = {
            price: total(items, session)
        };

        const response = await fetch("/api/stripe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const { sessionId } = await response.json();
        const { error } = await stripe.redirectToCheckout({
            sessionId,
        });

        if (error) {
            router.push("/error");
        }
    } catch (err) {
        console.error("Error in creating checkout session:", err);
        router.push("/error");
    }
}

export default handleCheckout;
