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
            <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
                
                <h2 className="text-xl font-semibold">
                    {professional.user?.firstName} {professional.user?.lastName}
                </h2>

                <p className="text-gray-600">
                    {professional.specialization}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                    Experience: {professional.experienceYears} years
                </p>

                <p className="text-sm mt-2 text-gray-500">
                    {professional.clinicCity}
                </p>

        {services.length > 0 && (
        <div>
            <h2 className="text-xl font-semibold mt-4">Services Offered</h2>

            <div className="mt-2 space-y-2">
            {services.map(s => (
                <div key={s.serviceID} className="p-3 border rounded-lg shadow">
                <h3 className="font-medium text-lg">{s.serviceName}</h3>
                </div>
            ))}
            </div>
        </div>
        )}
                <span className="mt-3 inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                    {professional.status}
                </span>
            </div>
        </Link>
    );
}
