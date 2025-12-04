"use client";
import { deleteService } from "@/lib/services";

export default function ServiceList({ items = [], onDeleted, onEdit }) {
  async function handleDelete(id) {
    await deleteService(id);
    onDeleted?.();
  }

  return (
    <div className="mt-4">
      {items.map(s => (
        <div key={s.serviceID} className="p-3 border rounded flex justify-between items-center">
          <div>
            <div className="font-medium">
              {s.serviceName}
              <span className="text-sm text-gray-500"> ({s.category})</span>
            </div>
            <div className="text-sm text-gray-600">{s.description}</div>
            <div className="text-sm text-gray-600">{s.durationMinutes} min • ${s.price}</div>
          </div>

          <div className="flex gap-2 items-center">
            <button onClick={() => handleDelete(s.serviceID)} className="text-red-600">
              Delete
            </button>
            <button onClick={() => onEdit(s)} className="text-blue-600">
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
