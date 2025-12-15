"use client";
import { useEffect, useState } from "react";
import { getServicesByProfessional } from "@/lib/services";

import Link from "next/link";

export default function ProfessionalCard({ professional }) {
   const [services, setServices] = useState([]);

    useEffect(() => {
        getServicesByProfessional(professional.professionalID)
            .then(setServices);
    }, [professional.professionalID]);
     return (
    <Link href={`/professionals/${professional.professionalID}`}>
      <div
        className="rounded-xl p-5 border
        shadow-md hover:shadow-xl transition bg-white
        hover:-translate-y-1 hover:border-primary-purple"
      >
        <div className="mb-3">
          <h2 className="text-2xl font-bold text-primary-dark">
            {professional.user?.firstName} {professional.user?.lastName}
          </h2>
          <p className="text-primary-purple font-medium">
            {professional.specialization}
          </p>
        </div>

        <div className="text-gray-700 space-y-1 text-md">
          <p>
            <b className="text-primary-dark">Experience:</b>{" "}
            {professional.experienceYears} years
          </p>
          <p>
            <b className="text-primary-dark">City:</b> {professional.clinicCity}
          </p>
        </div>

        {services.length > 0 && (
          <div className="mt-4 text-primary-dark">
            <h3 className="font-semibold mb-2 text-lg">
              Services Offered
            </h3>

            <div className="space-y-2">
              {services.map((s) => (
                <div
                  key={s.serviceID}
                  className="p-3 border rounded-lg bg-gray-50 shadow-sm"
                >
                  <p className="font-medium">{s.serviceName}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <span
          className="mt-4 inline-block px-3 py-1 rounded-full text-xs
          bg-primary-purple/10 text-primary-dark font-semibold"
        >
          {professional.status}
        </span>
      </div>
    </Link>
  );
}