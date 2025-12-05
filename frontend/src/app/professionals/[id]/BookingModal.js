"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { getAvailabilityByProfessional } from "@/lib/availability";
import { getServicesByProfessional } from "@/lib/services";
import { getProfessionalBookings, createBooking } from "@/lib/bookings";
import clsx from "clsx";

export default function BookingModal({ professional, selectedService, onClose, onBooked }) {
  const { user } = useAuth();
  const professionalID = professional?.professionalID;

  const [services, setServices] = useState([]);

  const [availability, setAvailability] = useState([]);

  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const [chosenService, setChosenService] = useState(selectedService || null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!professionalID) return;

    getServicesByProfessional(professionalID)
      .then((s) => setServices(s || []))
      .catch(() => setServices([]));

    getAvailabilityByProfessional(professionalID)
      .then((a) => setAvailability(a || []))
      .catch(() => setAvailability([]));
  }, [professionalID]);

  useEffect(() => {
    if (!date || !professionalID) {
      setSlots([]);
      setBookedSlots([]);
      return;
    }

    const day = getDayShort(date);

    const dayAvail = availability.filter((a) => a.dayOfWeek === day);

    if (!dayAvail.length) {
      setSlots([]);
    } else {
      const allSlots = [];

      dayAvail.forEach((a) => {
        const times = generateTimeSlots(a.startTime, a.endTime, 30);
        allSlots.push(...times);
      });

      const unique = [...new Set(allSlots)].sort((x, y) => timeToMinutes(x) - timeToMinutes(y));
      setSlots(unique);
    }

    getProfessionalBookings(professionalID, date)
      .then((res) => {
        let list = [];

        if (Array.isArray(res)) list = res;
        else if (Array.isArray(res?.data)) list = res.data;
        else if (Array.isArray(res?.bookings)) list = res.bookings;

        const times = list.map((it) => it.appointmentTime);
        setBookedSlots(times);
      })
      .catch(() => setBookedSlots([]));
  }, [date, availability, professionalID]);

  const patientID = user?.patient?.patientID;
console.log("MODAL PATIENT ID:", patientID);

  async function handleConfirmBooking() {
  setError(null);

  if (!chosenService) return setError("Please select a service.");
  if (!date || !selectedTime) return setError("Please choose date and time.");

  const realPatientID = user?.patient?.patientID;

  if (!realPatientID) {
    return setError("Patient profile not found. Please complete your patient info.");
  }

  setLoading(true);

  const payload = {
    professionalID,
    patientID: realPatientID,
    serviceID: chosenService.serviceID,
    appointmentDate: date,
    appointmentTime: selectedTime,
    duration: chosenService.durationMinutes,
  };

  console.log("BOOKING PAYLOAD:", payload);

  try {
    await createBooking(payload);

    onBooked?.();
    onClose?.();
    alert("Booking created successfully");
  } catch (err) {
    console.log("BOOKING ERROR:", err);
    setError(err?.response?.data?.message || "Error creating booking");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Book with {professional.user?.firstName} {professional.user?.lastName}
          </h3>
          <button onClick={() => onClose?.()}>✕</button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Service</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {services.map((s) => (
              <button
                key={s.serviceID}
                onClick={() => setChosenService(s)}
                className={clsx(
                  "p-3 border rounded",
                  chosenService?.serviceID === s.serviceID
                    ? "border-blue-600 bg-blue-50"
                    : "bg-white"
                )}
              >
                <div className="font-medium">{s.serviceName}</div>
                <div className="text-sm text-gray-600">{s.description}</div>
                <div className="text-sm text-gray-700 mt-1">
                  {s.durationMinutes} min • ${s.price}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Date</label>
          <input
            type="date"
            className="border p-2 rounded w-full"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              setDate(e.target.value);
              setSelectedTime("");
            }}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Available Times</label>

          {date && slots.length > 0 ? (
            <div className="grid grid-cols-4 gap-2 max-h-56 overflow-auto">
              {slots.map((t) => {
                const isBooked = bookedSlots.includes(t);

                return (
                  <button
                    key={t}
                    disabled={isBooked}
                    onClick={() => setSelectedTime(t)}
                    className={clsx(
                      "py-2 px-3 rounded border text-sm",
                      isBooked
                        ? "bg-red-100 text-red-700 cursor-not-allowed"
                        : selectedTime === t
                        ? "bg-blue-600 text-white"
                        : "bg-green-50"
                    )}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          ) : date ? (
            <div className="text-sm text-red-500">No availability for this date</div>
          ) : (
            <div className="text-sm text-gray-500">Select a date</div>
          )}
        </div>

        {error && <div className="text-red-600 mb-3 text-sm">{error}</div>}

        <div className="flex justify-end gap-2">
          <button onClick={() => onClose?.()} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleConfirmBooking}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}



function getDayShort(dateString) {
  const d = new Date(dateString + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short" });
}

function timeToMinutes(t) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function generateTimeSlots(start, end, interval = 30) {
  const slots = [];
  let [h, m] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);

  while (h < eh || (h === eh && m < em)) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);

    m += interval;
    if (m >= 60) {
      h += 1;
      m -= 60;
    }
  }

  return slots;
}
