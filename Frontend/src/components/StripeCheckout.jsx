// src/components/StripeCheckout.jsx
import { forwardRef, useImperativeHandle } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51RPOp94bZxfXaSYkmG60loOayf5v3VBicN3Igs5jQ8qIQwmD5tDFW6ysfxj0OkokC7LoxpRgmabQa9SVeNoWTtHE00CZp8DX7S");

const CheckoutForm = forwardRef(({ amount }, ref) => {
  const stripe = useStripe();
  const elements = useElements();

  useImperativeHandle(ref, () => ({
    async pay() {
      const res = await fetch("http://localhost:5100/api/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      return result;
    }
  }));

  return (
    <form>
      <CardElement options={{ hidePostalCode: false }} />
    </form>
  );
});

export default function StripeCheckoutWrapper({ amount, stripeRef }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm ref={stripeRef} amount={amount} />
    </Elements>
  );
}
