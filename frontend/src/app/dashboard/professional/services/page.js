"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import ServiceForm from "@/components/services/ServiceForm";
import ServiceList from "@/components/services/ServiceList";
import { getServicesByProfessional } from "@/lib/services";

export default function ProfessionalServicesPage() {
  const { user } = useAuth();
  const professionalID = user?.professionalID;

  const [items, setItems] = useState([]);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    if (!professionalID) return;
    getServicesByProfessional(professionalID).then(setItems);
  }, [professionalID]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary-dark via-primary-purple to-primary-pink
      text-transparent bg-clip-text">My Services</h1>

      <ServiceForm
        professionalID={professionalID}
        initialData={editingService}
        onSaved={() => {
          setEditingService(null);
          getServicesByProfessional(professionalID).then(setItems);
        }}
      />

      <ServiceList
        items={items}
        onDeleted={() => getServicesByProfessional(professionalID).then(setItems)}
        onEdit={(service) => setEditingService(service)}
      />
    </div>
  );
}
