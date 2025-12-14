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
  <form 
    onSubmit={handleSubmit}
    className="p-6 rounded-xl shadow-lg mt-6 
               bg-white/60 backdrop-blur 
               border border-primary/20 
               text-primary-dark space-y-4"
  >
    <h2 className="text-2xl font-bold text-primary-dark mb-4">
      {isEdit ? "Edit Service" : "Add Service"}
    </h2>

    <input
      className="w-full p-3 rounded-md border border-primary/30 
                 focus:outline-none focus:ring-2 focus:ring-primary-purple
                 text-primary-dark placeholder-muted"
      placeholder="Service name"
      value={form.serviceName}
      onChange={(e)=>setForm({...form, serviceName:e.target.value})}
      required
    />

    <textarea
      className="w-full p-3 rounded-md border border-primary/30
                 focus:outline-none focus:ring-2 focus:ring-primary-purple
                 text-primary-dark placeholder-muted"
      placeholder="Description"
      value={form.description}
      onChange={(e)=>setForm({...form, description:e.target.value})}
    />

    <input
      className="w-full p-3 rounded-md border border-primary/30
                 focus:outline-none focus:ring-2 focus:ring-primary-purple
                 text-primary-dark placeholder-muted"
      placeholder="Duration (minutes)"
      value={form.durationMinutes}
      onChange={(e)=>setForm({...form, durationMinutes:e.target.value})}
    />

    <input
      type="number"
      step="0.01"
      className="w-full p-3 rounded-md border border-primary/30
                 focus:outline-none focus:ring-2 focus:ring-primary-purple
                 text-primary-dark placeholder-muted"
      placeholder="Price"
      value={form.price}
      onChange={(e)=>setForm({...form, price: parseFloat(e.target.value || 0)})}
    />

    <input
      className="w-full p-3 rounded-md border border-primary/30
                 focus:outline-none focus:ring-2 focus:ring-primary-purple
                 text-primary-dark placeholder-muted"
      placeholder="Category"
      value={form.category}
      onChange={(e)=>setForm({...form, category:e.target.value})}
    />

    <label className="flex items-center gap-2 text-primary-dark">
      <input 
        type="checkbox"
        className="accent-primary-purple"
        checked={form.isActive}
        onChange={(e)=>setForm({...form, isActive:e.target.checked})}
      />
      Active
    </label>

    <button 
      className="w-full bg-primary-pink text-white py-3 rounded-lg mt-2
                 font-semibold shadow-sm
                 hover:bg-primary-pink-hover
                 transition-all duration-200"
    >
      {isEdit ? "Save Changes" : "Create"}
    </button>
  </form>
);
}