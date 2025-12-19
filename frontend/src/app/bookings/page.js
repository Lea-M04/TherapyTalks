"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { getBookings } from "@/lib/bookings";
import CheckoutModal from "@/components/payments/CheckoutModal";
import { useRouter } from "next/navigation";
export default function BookingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
const router = useRouter();
  const [checkoutBooking, setCheckoutBooking] = useState(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }
     if (user && !user?.patient?.patientID) {
    router.refresh();
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
  }, [user, authLoading, router]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) return <div className="p-6">Please login</div>;

  if (!user?.patient?.patientID)
    return (
      <div className="p-6 text-red-600">
        Your patient profile is incomplete.
      </div>
    );
    
return (
  <div className="p-6 max-w-3xl mx-auto text-primary-dark">
    <h1 className="text-3xl font-semibold mb-6 text-primary-purple">
      My Bookings
    </h1>

    {bookings.length === 0 ? (
      <p className="text-gray-600">You have no bookings yet.</p>
    ) : (
      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.bookingID}
            className="rounded-xl border bg-white shadow p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-lg">
                {b.appointmentDate} • {b.appointmentTime}
              </div>


              <span
                className={`px-2 py-1 text-md rounded-full 
                  ${
                    b.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : b.status === "canceled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
              >
                {b.status}
              </span>
            </div>

            <div className="text-gray-700">
              <p>
                <strong>Service:</strong> {b.serviceName}
              </p>

              <p>
                <strong>Professional:</strong> {b.professionalFirstName}{" "}
                {b.professionalLastName}
              </p>
            </div>

            {b.status === "confirmed" && (
              <div className="mt-4">
                <button
                  onClick={() => setCheckoutBooking(b)}
                  className="px-4 py-2 bg-primary-dark text-white rounded-lg hover:bg-gray-800 transition"
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