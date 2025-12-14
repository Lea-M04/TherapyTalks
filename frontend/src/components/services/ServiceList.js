"use client";
import { deleteService } from "@/lib/services";

export default function ServiceList({ items = [], onDeleted, onEdit }) {
  async function handleDelete(id) {
    await deleteService(id);
    onDeleted?.();
  }

  return (
  <div className="mt-6 space-y-4">
    {items.map(s => (
      <div
        key={s.serviceID}
        className="p-4 rounded-lg border shadow-sm bg-white
                   hover:shadow-md transition-all duration-200"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex justify-between items-start">

          {/* LEFT SIDE INFO */}
          <div className="space-y-1">
            <div className="font-semibold text-primary-purple">
              {s.serviceName}
              <span className="text-sm text-primary-dark ml-1">
                ({s.category})
              </span>
            </div>

            <div className="text-sm text-primary-dark">
              {s.description}
            </div>

            <div className="text-sm text-primary-dark">
              {s.durationMinutes} min • ${s.price}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3 items-center">

            <button
              onClick={() => handleDelete(s.serviceID)}
              className="px-3 py-1.5 text-xs rounded-md
                         bg-primary-pink text-white
                         hover:bg-primary-pink-hover transition"
            >
              Delete
            </button>

            <button
              onClick={() => onEdit(s)}
              className="px-3 py-1.5 text-xs rounded-md
                         bg-primary-purple text-white
                         hover:bg-primary-purple-hover transition"
            >
              Edit
            </button>

          </div>
        </div>
      </div>
    ))}
  </div>
);
}
