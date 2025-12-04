"use client";

import { deleteAvailability } from "@/lib/availability";

export default function AvailabilityList({ items=[] }) {
  async function remove(id) {
    await deleteAvailability(id);
    window.location.reload();
  }

  return (
    <div className="mt-6">
      {items.map(item => (
        <div key={item.availabilityID} className="border p-3 flex justify-between">
         <span>
        {item.dayOfWeek} {item.startTime} - {item.endTime}
      </span>

    <button onClick={() => remove(item.availabilityID)}>
      Delete
    </button>

        </div>
      ))}
    </div>
  );
}
