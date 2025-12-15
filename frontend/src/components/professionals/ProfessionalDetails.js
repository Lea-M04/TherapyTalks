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
  <div className="p-6 max-w-5xl mx-auto">
  
    <h1
      className="text-4xl font-extrabold mb-2
      text-primary-purple
     "
    >
      {user.firstName} {user.lastName}
    </h1>
     <div className="flex justify-start mb-4  text-lg">
      <StartChatButton professionalID={professional.professionalID} />
    </div>

    <div className="bg-white p-6 rounded-xl shadow-lg border border-primary/30 space-y-6">

      <div className="flex items-center gap-4">
        {user.profileImage && (
          <img
            src={user.profileImage}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4
            border-primary-pink shadow-md"
          />
        )}

        <div>
          <p className="text-primary-dark font-bold text-2xl">
            {professional.specialization}
          </p>
          <p className="text-primary-purple">@{user.username}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-primary-dark">Basic Information</h2>
      <div className="grid grid-cols-2 gap-3 text-md text-primary-dark">
        <p><b className="text-primary-purple">Email:</b> {user.email}</p>
        <p><b className="text-primary-purple">Phone:</b> {user.phoneNumber}</p>
      </div>

      {professional.bio && (
        <p className="text-primary-dark whitespace-pre-line">
          <b className="text-primary-purple">Bio:</b> {professional.bio}
        </p>
      )}

      {professional.education && (
        <p className="text-primary-dark">
          <b className="text-primary-purple">Education:</b> {professional.education}
        </p>
      )}

      <p className="text-primary-dark">
        <b className="text-primary-purple">Experience:</b> {professional.experienceYears} years
      </p>

      {professional.availability?.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-primary-dark mt-4">Availability</h2>

          <div className="mt-3 space-y-2">
            {professional.availability.map((slot, index) => (
              <div
                key={index}
                className="p-3 border rounded-lg shadow-sm bg-primary-50 flex justify-between items-center"
              >
                <span className="font-medium text-primary-dark">{slot.dayOfWeek}</span>
                <span className="text-primary-purple">
                  {slot.startTime} - {slot.endTime}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {services.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-primary-dark mt-4">
            Services Offered
          </h2>

          <div className="mt-3 space-y-3">
            {services.map((s) => (
              <div
                key={s.serviceID}
                className="p-4 border rounded-lg shadow-md bg-white"
              >
                <h3 className="font-medium text-lg text-primary-dark">{s.serviceName}</h3>
                <p className="text-gray-600">{s.description}</p>
                <p className="text-primary-purple font-semibold">
                  {s.durationMinutes} min • ${s.price}
                </p>

                <button
                  onClick={() => {
                    setSelectedService(s);
                    setOpenBooking(true);
                  }}
                  className="mt-3 bg-primary-purple text-white px-5 py-2 rounded-lg
                  hover:bg-primary-dark transition shadow"
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

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