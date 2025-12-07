"use client";

import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm({ clientSecret, onSuccess, onError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);

    const card = elements.getElement(CardElement);
    if (!card) {
      setLoading(false);
      return onError?.("Card element not ready");
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
      },
    });

    setLoading(false);

    if (error) {
      onError?.(error.message || "Payment failed");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess?.(paymentIntent);
    } else {
      onError?.("Payment did not succeed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <CardElement options={{ hidePostalCode: true }} />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="submit"
          disabled={!stripe || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
        >
          {loading ? "Processing..." : "Pay"}
        </button>
      </div>
    </form>
  );
}
