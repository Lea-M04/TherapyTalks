"use client";

import { useEffect, useState } from "react";
import { getBookings, deleteBooking } from "@/lib/bookings";
import Link from "next/link";
import Modal from "@/components/ui/Modal";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const loadData = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to load bookings", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const confirmDelete = async () => {
    try {
      await deleteBooking(deleteId);
      setOpenDeleteModal(false);
      setDeleteId(null);
      await loadData();
    } catch (err) {
      console.error("Failed to delete booking", err);
    }
  };

  return (
    <div className="p-6 text-primary-dark">

      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <h2 className="text-xl font-bold mb-4">Delete Booking</h2>
        <p className="mb-4">Are you sure you want to delete this booking?</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpenDeleteModal(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </Modal>

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Bookings</h1>

        <Link
          href="/dashboard/admin/bookings/create"
          className="bg-primary-dark text-white px-4 py-2 rounded"
        >
          + Create Booking
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Patient</th>
            <th className="border p-2">Professional</th>
            <th className="border p-2">Service</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.bookingID}>
              <td className="border p-2">{b.bookingID}</td>

              <td className="border p-2">
                {b.patientFirstName} {b.patientLastName}
              </td>

              <td className="border p-2">
                {b.professionalFirstName} {b.professionalLastName}
              </td>

              <td className="border p-2">{b.serviceName}</td>

              <td className="border p-2">{b.appointmentDate}</td>
              <td className="border p-2">{b.appointmentTime}</td>

              <td className="border p-2 font-semibold">
                {b.status}
              </td>

              <td className="border p-2 flex gap-2">
                <Link
                  href={`/dashboard/admin/bookings/${b.bookingID}/edit`}
                  className="px-3 py-1 bg-primary-pink text-white rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => {
                    setDeleteId(b.bookingID);
                    setOpenDeleteModal(true);
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {bookings.length === 0 && (
            <tr>
              <td colSpan="8" className="p-4 text-center">
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
