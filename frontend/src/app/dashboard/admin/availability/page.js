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

    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-dark via-primary-purple to-primary-pink text-transparent bg-clip-text">
        Availabilities
      </h1>
    </div>

    <div className="overflow-hidden rounded-lg border border-primary/20 shadow-sm bg-white">
      <table className="w-full text-primary-dark">
        <thead className="bg-primary/20">
          <tr>
            {["ID", "Professional", "Day", "Start", "End", "Available"].map((h) => (
              <th
                key={h}
                className="p-3 border border-primary/10 text-left text-sm font-semibold"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items.map((a) => (
            <tr
              key={a.availabilityID}
              className="hover:bg-primary-pink/10 transition"
            >
              <td className="p-3 border border-primary/10">
                {a.availabilityID}
              </td>

              <td className="p-3 border border-primary/10">
                {a.professional
                  ? `${a.professional.firstName} ${a.professional.lastName}`
                  : "Unknown"}
              </td>

              <td className="p-3 border border-primary/10">{a.dayOfWeek}</td>
              <td className="p-3 border border-primary/10">{a.startTime}</td>
              <td className="p-3 border border-primary/10">{a.endTime}</td>

              <td className="p-3 border border-primary/10">
                {a.isAvailable ? "Yes" : "No"}
              </td>
            </tr>
          ))}

          {items.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-center text-primary-dark">
                No availability records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="flex justify-center items-center gap-6 mt-6 text-primary-dark">
      <button
        disabled={pagination.current_page <= 1}
        onClick={() => loadPage(pagination.current_page - 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 disabled:opacity-40 transition"
      >
        Prev
      </button>

      <button
        disabled={pagination.current_page >= pagination.last_page}
        onClick={() => loadPage(pagination.current_page + 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 disabled:opacity-40 transition"
      >
        Next
      </button>
    </div>
  </div>
);
}
