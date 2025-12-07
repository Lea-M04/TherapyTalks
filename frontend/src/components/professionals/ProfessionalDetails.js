"use client";
import { useEffect, useState } from "react";
import { getServicesByProfessional } from "@/lib/services";
import BookingModal from "@/app/professionals/[id]/BookingModal";
import StartChatButton from "@/components/chat/StartChatButton";
export default function ProfessionalDetails({ professional }) {
  const user = professional.user || {};
  const [services, setServices] = useState([]);
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

   useEffect(() => {
    getServicesByProfessional(professional.professionalID)
      .then(setServices)
      .catch(() => setServices([]));
  }, [professional.professionalID]);

  return (
    <div className="p-6 border rounded-xl shadow space-y-4">

<StartChatButton professionalID={professional.professionalID} />
      <h1 className="text-3xl font-semibold">
        {user.firstName} {user.lastName}
      </h1>

      <div className="text-gray-700">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phoneNumber}</p>
      </div>

      {user.profileImage && (
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border"
        />
      )}

      <p className="text-lg font-medium text-gray-800">
        {professional.specialization}
      </p>

      <p className="text-gray-600">
        <strong>Experience:</strong> {professional.experienceYears} years
      </p>

      {professional.education && (
        <p className="text-gray-700">
          <strong>Education:</strong> {professional.education}
        </p>
      )}

      {professional.bio && (
        <p className="text-gray-700 whitespace-pre-line">
          <strong>Bio:</strong> {professional.bio}
        </p>
      )}

      {professional.availability?.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Availability</h2>

          <div className="mt-2 space-y-2">
            {professional.availability.map((slot, index) => (
              <div
                key={index}
                className="p-3 border rounded-lg bg-primary-50 flex justify-between"
              >
                <span className="font-medium">{slot.dayOfWeek}</span>
                <span>{slot.startTime} - {slot.endTime}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {services.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-4">Services Offered</h2>

          <div className="mt-2 space-y-2">
            {services.map(s => (
              <div key={s.serviceID} className="p-3 border rounded-lg shadow">
                <h3 className="font-medium text-lg">{s.serviceName}</h3>
                <p className="text-gray-600">{s.description}</p>
                <p className="text-gray-700">{s.durationMinutes} min • ${s.price}</p>

                <button
                  onClick={() => { setSelectedService(s); setOpenBooking(true); }}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {openBooking && (
  <BookingModal
    professional={professional}
    selectedService={selectedService}
    onClose={() => setOpenBooking(false)}
    onBooked={() => setOpenBooking(false)}
  />
)}

    </div>
  );
}