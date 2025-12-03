"use client";

import { deleteAvailability } from "@/lib/availability";

export default function AvailabilityList({ items }) {
  async function remove(id) {
    await deleteAvailability(id);
    window.location.reload();
  }

  return (
    <div className="mt-6">
      {items?.map(item => (
        <div key={item.id} className="border p-3 flex justify-between">
          <span>{item.day} {item.start_time} - {item.end_time}</span>
          <button onClick={() => remove(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
