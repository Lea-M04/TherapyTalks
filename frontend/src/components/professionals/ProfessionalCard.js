"use client";

import Link from "next/link";

export default function ProfessionalCard({ professional }) {
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

                <span className="mt-3 inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-600">
                    {professional.status}
                </span>
            </div>
        </Link>
    );
}
