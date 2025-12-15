"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createBooking,
  getBookingById,
  updateBookingStatus,
} from "@/lib/bookings";

import { getPatientsAll } from "@/lib/patients";
import { getProfessionals } from "@/lib/professionals";
import { getAllServices } from "@/lib/services";

export default function BookingForm({ params }) {
  const router = useRouter();
  const bookingId = params?.id !== "create" ? params.id : null;
  const isEdit = bookingId !== null;

  const [patients, setPatients] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [services, setServices] = useState([]);

  const [form, setForm] = useState({
    patientID: "",
    professionalID: "",
    serviceID: "",
    appointmentDate: "",
    appointmentTime: "",
    status: "pending",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    try {
      const p = await getPatientsAll();
      const pr = await getProfessionals();
      const s = await getAllServices();

      setPatients(p.data);
      setProfessionals(pr);
      setServices(s.data ?? s); 
    } catch (err) {
      console.error("Dropdown load error:", err);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getBookingById(bookingId).then((b) =>
        setForm({
          patientID: b.patientID,
          professionalID: b.professionalID,
          serviceID: b.serviceID,
          appointmentDate: b.appointmentDate,
          appointmentTime: b.appointmentTime,
          status: b.status,
        })
      );
    }
  }, [isEdit, bookingId]);

  const submit = async () => {
    try {
      if (isEdit) {
        await updateBookingStatus(bookingId, form.status);
      } else {
        await createBooking(form);
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard/admin/bookings");
      }, 1200);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4 text-primary-dark">
        {isEdit ? "Edit Booking" : "Create Booking"}
      </h1>

      <div className="space-y-4">
        {!isEdit && (
          <>

            <select
              className="border p-2 w-full text-primary-dark"
              value={form.patientID}
              onChange={(e) =>
                setForm({ ...form, patientID: e.target.value })
              }
            >
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option key={p.patientID} value={p.patientID}>
                  {p.user?.firstName} {p.user?.lastName}
                </option>
              ))}
            </select>

            <select
              className="border p-2 w-full text-primary-dark"
              value={form.professionalID}
              onChange={(e) =>
                setForm({ ...form, professionalID: e.target.value })
              }
            >
              <option value="">Select Professional</option>
              {professionals.map((pr) => (
                <option key={pr.professionalID} value={pr.professionalID}>
                  {pr.user?.firstName} {pr.user?.lastName}
                </option>
              ))}
            </select>

            <select
              className="border p-2 w-full text-primary-dark"
              value={form.serviceID}
              onChange={(e) =>
                setForm({ ...form, serviceID: e.target.value })
              }
            >
              <option value="">Select Service</option>
              {services.map((s) => (
                <option key={s.serviceID} value={s.serviceID}>
                  {s.serviceName} — {s.price}€
                </option>
              ))}
            </select>

            <input
              type="date"
              className="border p-2 w-full text-primary-dark"
              value={form.appointmentDate}
              onChange={(e) =>
                setForm({ ...form, appointmentDate: e.target.value })
              }
            />

            <input
              type="time"
              className="border p-2 w-full text-primary-dark"
              value={form.appointmentTime}
              onChange={(e) =>
                setForm({ ...form, appointmentTime: e.target.value })
              }
            />
          </>
        )}

        <select
          className="border p-2 w-full text-primary-dark"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="canceled">Canceled</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={submit}
          className="px-6 py-2 bg-primary-dark text-white rounded"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
}
