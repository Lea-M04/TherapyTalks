"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { getBookings, updateBookingStatus } from "@/lib/bookings"; 

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

  async function handleStatusChange(id, newStatus) {
  try {
    await updateBookingStatus(id, newStatus);

    setItems(items.map(it =>
      it.bookingID === id ? { ...it, status: newStatus } : it
    ));

    alert("Status updated!");
  } catch (e) {
    console.error(e);
    alert("Error updating status");
  }
}


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bookings Received</h1>

      <div className="mt-4 space-y-3">
        {items.length === 0 && <p>No bookings yet.</p>}

        {items.map(b => (
          <div key={b.bookingID} className="p-3 border rounded">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">Booking</div>
                <div>{b.appointmentDate} {b.appointmentTime}</div>

                <div>
                  Patient: {b.patientFirstName} {b.patientLastName}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm">{b.status}</div>

                <div className="flex gap-2 mt-2">

                  <button
                    onClick={() => handleStatusChange(b.bookingID, "confirmed")}
                    className="px-2 py-1 bg-green-600 text-white rounded text-xs"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() => handleStatusChange(b.bookingID, "canceled")}
                    className="px-2 py-1 bg-red-600 text-white rounded text-xs"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => handleStatusChange(b.bookingID, "completed")}
                    className="px-2 py-1 bg-blue-600 text-white rounded text-xs"
                  >
                    Complete
                  </button>

                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
