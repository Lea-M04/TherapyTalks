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
  <div className="p-6 max-w-4xl mx-auto">

    <h1 className="text-3xl font-bold mb-6
      bg-gradient-to-r from-primary-dark via-primary-purple to-primary-pink
      text-transparent bg-clip-text">
      Bookings Received
    </h1>

    <div className="space-y-4">
      {items.length === 0 && (
        <p className="text-primary-dark/80 text-lg">No bookings yet.</p>
      )}

      {items.map((b) => (
        <div
          key={b.bookingID}
          className="p-5 rounded-xl border border-primary/30 bg-white shadow-md hover:shadow-lg transition"
        >
          <div className="flex justify-between">

  
            <div className="space-y-1">
              <div className="font-semibold text-primary-dark text-lg">
                Booking
              </div>

              <div className="text-primary-dark/80 text-sm">
                {b.appointmentDate} — {b.appointmentTime}
              </div>

              <div className="text-primary-dark/90">
                <span className="font-semibold">Patient:</span>{" "}
                {b.patientFirstName} {b.patientLastName}
              </div>
            </div>

            <div className="text-right">
              
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    b.status === "confirmed"
                      ? "bg-primary-pink text-white"
                      : b.status === "canceled"
                      ? "bg-primary-purple text-white"
                      : b.status === "completed"
                      ? "bg-primary/20 text-primary-dark"
                      : "bg-gray-200 text-gray-700"
                  }
                `}
              >
                {b.status}
              </div>

              <div className="flex gap-2 mt-3 justify-end">

                <button
                  onClick={() => handleStatusChange(b.bookingID, "confirmed")}
                  className="px-3 py-1.5 bg-primary-pink text-white rounded-md 
                             text-xs hover:bg-primary-pink-hover transition"
                >
                  Confirm
                </button>

                <button
                  onClick={() => handleStatusChange(b.bookingID, "canceled")}
                  className="px-3 py-1.5 bg-primary-purple text-white rounded-md 
                             text-xs hover:bg-primary-purple-hover transition"
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleStatusChange(b.bookingID, "completed")}
                  className="px-3 py-1.5 bg-primary-dark text-white rounded-md 
                             text-xs hover:bg-primary-purple transition"
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