"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { getBookings } from "@/lib/bookings";
import CheckoutModal from "@/components/payments/CheckoutModal";

export default function BookingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [checkoutBooking, setCheckoutBooking] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    const patientID = user?.patient?.patientID;
    if (!patientID) {
      setLoading(false);
      return;
    }

    getBookings({ patientID })
      .then((res) => setBookings(res?.data || res || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, [user, authLoading]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <div className="p-6">Please login</div>;

  if (!user?.patient?.patientID)
    return (
      <div className="p-6 text-red-600">
        Your patient profile is incomplete.
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">You have no bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.bookingID}
              className="border rounded p-4 bg-white shadow-sm"
            >
              <div className="font-semibold">
                Date: {b.appointmentDate} — {b.appointmentTime}
              </div>

              <div>Service Name: {b.serviceName}</div>

              <div>
                Professional: {b.professionalFirstName} {b.professionalLastName}
              </div>

              <div className="font-medium mt-1">
                Status:{" "}
                <span
                  className={
                    b.status === "confirmed"
                      ? "text-green-600"
                      : b.status === "canceled"
                      ? "text-red-600"
                      : "text-gray-700"
                  }
                >
                  {b.status}
                </span>
              </div>

              {b.status === "confirmed" && (
                <div className="mt-3">
                  <button
                    onClick={() => setCheckoutBooking(b)}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Proceed to checkout
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {checkoutBooking && (
        <CheckoutModal
          booking={checkoutBooking}
          onClose={() => setCheckoutBooking(null)}
          onPaid={() => {
            const patientID = user?.patient?.patientID;
            getBookings({ patientID }).then((res) =>
              setBookings(res?.data || res || [])
            );

            setCheckoutBooking(null);
          }}
        />
      )}
    </div>
  );
}
