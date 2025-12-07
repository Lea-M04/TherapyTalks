import api from "./axios";

export async function createPaymentForBooking(bookingID) {

    const res = await api.post(`/payments/booking/${bookingID}`);

    return res.data.data; 
}

export async function createStripeIntent({ amount, paymentID, bookingID }) {
  const res = await api.post("/payments/stripe-intent", {
    amount,
    paymentID,
    bookingID,
  });
  return res.data;
}


export async function confirmPaymentOnServer({ paymentID, transactionID }) {

  const res = await api.post(`/payments/confirm`, {
    paymentID,
    transactionID,
  });
  return res.data;
}
