"use client";

import { useEffect, useState } from "react";
import AvailabilityForm from "@/components/availability/AvailabilityForm";
import AvailabilityList from "@/components/availability/AvailabilityList";
import { getAvailabilityByProfessional } from "@/lib/availability";

export default function AvailabilityPage({ searchParams }) {
    const [data, setData] = useState([]);
    const professionalID = searchParams?.professionalID;

   useEffect(() => {
    if (!professionalID) return;

    getAvailabilityByProfessional(professionalID)
        .then(setData)
        .catch(err => console.error(err));
}, [professionalID]);


    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Manage Availability</h1>

            <AvailabilityForm professionalID={professionalID} />
            <AvailabilityList items={data} />
        </div>
    );
}
