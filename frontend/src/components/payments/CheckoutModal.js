"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { createPaymentForBooking, createStripeIntent, confirmPaymentOnServer } from "@/lib/payments";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function CheckoutModal({ booking, onClose, onPaid }) {

  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentRecord, setPaymentRecord] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {

   async function init() {
   setProcessing(true);
   setError(null);

    try {

        const payment = await createPaymentForBooking(booking.bookingID);
        setPaymentRecord(payment);

        const amount = payment.amount; 
        
        if (!amount || typeof amount !== 'number' || amount < 0.5) { 
            throw new Error(`Shuma e pagesës e pavlefshme: ${amount} EUR. Kërkohet të jetë të paktën 0.50 EUR.`);
        }

         const intent = await createStripeIntent({
            amount: amount, 
            paymentID: payment.paymentID,
            bookingID: booking.bookingID,
        });

        setClientSecret(intent.clientSecret);
     } catch (err) {
        console.error("Checkout init error", err);
        setError(err?.message || "Gabim gjatë përgatitjes së pagesës.");
     } finally {
         setProcessing(false);
      }
    }

     init();
   }, [booking]);

async function handleSuccess(paymentIntent) {
    let confirmationSucceeded = true; 
    try {
        await confirmPaymentOnServer({
            paymentID: paymentRecord.paymentID,
            transactionID: paymentIntent.id,
        });
        onPaid?.(paymentRecord);
        alert("Pagesa u krye me sukses! 🎉");
    } catch (err) {
        confirmationSucceeded = false;
        console.error("Confirm error", err);
        alert("Pagesa u krye, por dështoi konfirmimi në server. Ju lutemi kontaktoni mbështetjen.");
    } finally {
        onClose?.(); 
    }
}

  if (processing) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white p-6 rounded">Duke përgatitur pagesën...</div>
      </div>
    );
  }
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Checkout për Rezervimin #{booking.bookingID}</h3>
          <button onClick={() => onClose?.()}>✕</button>
        </div>


        {error && (
            <div className="p-3 mb-4 bg-red-100 text-red-700 border border-red-400 rounded">
                Gabim: {error}
            </div>
        )}

        {!clientSecret && !error && <div>Duke pritur konfigurimin e pagesës...</div>}

       {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <div className="mb-4 font-bold text-xl text-center">
                Pagesa Totale: {paymentRecord?.amount.toFixed(2)} EUR
            </div>
            <CheckoutForm
              clientSecret={clientSecret}
              onSuccess={handleSuccess}
              onError={(msg) => alert(msg)}
            />
         </Elements>
        )}
      </div>
    </div>
  );
}