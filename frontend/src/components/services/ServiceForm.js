"use client";
import { useState, useEffect } from "react";
import { createService, updateService } from "@/lib/services";

export default function ServiceForm({ 
  professionalID, 
  onSaved, 
  initialData = null 
}) {

  const isEdit = Boolean(initialData);

  const [form, setForm] = useState({
    serviceName: "",
    description: "",
    durationMinutes: "",
    price: 0,
    category: "",
    isActive: true,
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await updateService(initialData.serviceID, form);
    } else {
      await createService({ ...form, professionalID });
    }

    onSaved?.();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow mt-4">
      <h2 className="text-xl font-semibold mb-3">
        {isEdit ? "Edit Service" : "Add Service"}
      </h2>

      <input className="border p-2 rounded w-full mb-2" placeholder="Service name"
        value={form.serviceName}
        onChange={(e)=>setForm({...form, serviceName:e.target.value})}
        required />

      <textarea className="border p-2 rounded w-full mb-2" placeholder="Description"
        value={form.description}
        onChange={(e)=>setForm({...form, description:e.target.value})} />

      <input className="border p-2 rounded w-full mb-2" placeholder="Duration (minutes)"
        value={form.durationMinutes}
        onChange={(e)=>setForm({...form, durationMinutes:e.target.value})} />

      <input type="number" step="0.01" className="border p-2 rounded w-full mb-2" placeholder="Price"
        value={form.price}
        onChange={(e)=>setForm({...form, price: parseFloat(e.target.value || 0)})} />

      <input className="border p-2 rounded w-full mb-2" placeholder="Category"
        value={form.category}
        onChange={(e)=>setForm({...form, category:e.target.value})} />

      <label className="flex items-center gap-2 mb-2">
        <input type="checkbox"
          checked={form.isActive}
          onChange={(e)=>setForm({...form, isActive:e.target.checked})} />
        Active
      </label>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {isEdit ? "Save Changes" : "Create"}
      </button>
    </form>
  );
}
