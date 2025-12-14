"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import AvailabilityForm from "@/components/availability/AvailabilityForm";
import AvailabilityList from "@/components/availability/AvailabilityList";
import { getAvailabilityByProfessional } from "@/lib/availability";

export default function AvailabilityPage() {
    const { user } = useAuth();
    const professionalID = user?.professionalID; 
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!professionalID) return;

        getAvailabilityByProfessional(professionalID)
            .then(setData)
            .catch((err) => console.error(err));
    }, [professionalID]);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-dark via-primary-purple to-primary-pink
      text-transparent bg-clip-text">Manage Availability</h1>

            <AvailabilityForm professionalID={professionalID} 
             onCreated={() => {
    getAvailabilityByProfessional(professionalID).then(setData);}}/>
            <AvailabilityList items={data} />
        </div>
    );
}
