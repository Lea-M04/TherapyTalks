"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { getBookings } from "@/lib/bookings";

export default function BookingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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
      .then((res) => setBookings(res?.data || []))
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

  if (loading) return <div className="p-6">Loading...</div>;

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
              <div>Status: {b.status}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
