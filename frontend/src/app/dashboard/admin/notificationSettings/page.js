"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState([]);
  const [pagination, setPagination] = useState({});

  const loadPage = (page) => {
    api.get(`/notification_settings?page=${page}`).then(res => {
      setSettings(res.data.data);
      setPagination(res.data);
    });
  };

  useEffect(() => {
    api.get("/notification_settings")
      .then(res => {
        setSettings(res.data.data);
        setPagination(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
  <div className="p-6">

    <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r 
      from-primary-dark via-primary-purple to-primary-pink 
      text-transparent bg-clip-text">
      Notification Settings
    </h1>

    <div className="overflow-hidden rounded-lg border border-primary/20 shadow-sm bg-white">
      <table className="w-full text-primary-dark">
        <thead className="bg-primary/20">
          <tr>
            {["ID", "User", "Email", "Push", "Created At"].map((h) => (
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
          {settings.map((stt) => (
            <tr
              key={stt.settingsID}
              className="hover:bg-primary-pink/10 transition"
            >
              <td className="p-3 border border-primary/10">{stt.settingsID}</td>

              <td className="p-3 border border-primary/10">
                {stt.user
                  ? `${stt.user.firstName} ${stt.user.lastName}`
                  : stt.userID}
              </td>

              <td className="p-3 border border-primary/10">
                {stt.emailNotifications ? "Yes" : "No"}
              </td>

              <td className="p-3 border border-primary/10">
                {stt.pushNotifications ? "Yes" : "No"}
              </td>

              <td className="p-3 border border-primary/10">
                {new Date(stt.created_at).toLocaleString()}
              </td>
            </tr>
          ))}

          {settings.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="p-4 text-center text-primary-dark"
              >
                No settings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="flex justify-center items-center gap-6 mt-6 text-primary-dark">
      <button
        disabled={!pagination.prev_page_url}
        onClick={() => loadPage(pagination.current_page - 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 disabled:opacity-40 transition"
      >
        Prev
      </button>

      <button
        disabled={!pagination.next_page_url}
        onClick={() => loadPage(pagination.current_page + 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 disabled:opacity-40 transition"
      >
        Next
      </button>
    </div>

  </div>
);
}
