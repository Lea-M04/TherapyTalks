"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { getBookings } from "@/lib/bookings";

export default function ProfessionalBookingsPage() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const profID = user?.professionalID ?? user?.professional?.professionalID;
    if (!profID) return;
    getBookings({ professionalID: profID })
      .then(res => setItems(res.data ?? res))
      .catch(err => console.error(err));
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bookings Received</h1>
      <div className="mt-4 space-y-3">
        {items.length === 0 && <p>No bookings yet.</p>}
        {items.map(b => (
          <div key={b.bookingID} className="p-3 border rounded">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">Booking #{b.bookingID}</div>
                <div>{b.appointmentDate} {b.appointmentTime}</div>
                <div>Patient: {b.patientName ?? b.patient?.firstName}</div>
              </div>
              <div className="text-right">
                <div className="text-sm">{b.status}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
