"use client";

import { useEffect, useState } from "react";
import { getAllAvailabilities } from "@/lib/availability";

export default function AvailabilityPage() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({});

  const loadPage = (page) => {
    getAllAvailabilities(page).then((res) => {
      setItems(res.data);
      setPagination(res.meta);
    });
  };

  useEffect(() => {
    loadPage(1);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl text-primary-dark font-bold mb-4">
        Availabilities
      </h1>

      <table className="w-full border text-primary-dark">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Professional</th>
            <th className="p-2 border">Day</th>
            <th className="p-2 border">Start</th>
            <th className="p-2 border">End</th>
            <th className="p-2 border">Available</th>
          </tr>
        </thead>

        <tbody>
          {items.map((a) => (
            <tr key={a.availabilityID}>
              <td className="p-2 border">{a.availabilityID}</td>

              <td className="p-2 border">
                {a.professional
                  ? `${a.professional.firstName} ${a.professional.lastName}`
                  : "Unknown"}
              </td>

              <td className="p-2 border">{a.dayOfWeek}</td>
              <td className="p-2 border">{a.startTime}</td>
              <td className="p-2 border">{a.endTime}</td>
              <td className="p-2 border">
                {a.isAvailable ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center gap-6 mt-4">
        <button
          disabled={pagination.current_page <= 1}
          onClick={() => loadPage(pagination.current_page - 1)}
          className="text-primary-dark font-bold text-lg disabled:opacity-50"
        >
          Prev
        </button>

        <button
          disabled={pagination.current_page >= pagination.last_page}
          onClick={() => loadPage(pagination.current_page + 1)}
          className="text-primary-dark font-bold text-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
