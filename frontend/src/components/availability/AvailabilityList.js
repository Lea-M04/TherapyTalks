"use client";

import { deleteAvailability } from "@/lib/availability";

export default function AvailabilityList({ items=[] }) {
  async function remove(id) {
    await deleteAvailability(id);
    window.location.reload();
  }

  return (
  <div className="mt-6 space-y-3">

    {items.map(item => (
      <div
        key={item.availabilityID}
        className="flex justify-between items-center 
                   bg-white border border-border 
                   p-4 rounded-lg shadow-sm hover:shadow-md 
                   transition-shadow"
      >
        <span className="text-primary-dark font-medium">
          {item.dayOfWeek} 
          <span className="text-muted ml-1">
            {item.startTime} - {item.endTime}
          </span>
        </span>
        <button
          onClick={() => remove(item.availabilityID)}
          className="
            px-3 py-1.5 rounded-md text-white text-sm
            bg-primary-purple hover:bg-primary-purple-hover
            transition
          "
        >
          Delete
        </button>
      </div>
    ))}

  </div>
);
}
