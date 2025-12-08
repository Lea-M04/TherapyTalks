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
      <h1 className="text-2xl text-primary-dark font-bold mb-4">
        Notification Settings
      </h1>

      <table className="w-full text-primary-dark border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Push</th>
            <th className="p-2 border">Created At</th>
          </tr>
        </thead>

        <tbody>
          {settings.map(stt => (
            <tr key={stt.settingsID}>
              <td className="p-2 border">{stt.settingsID}</td>
              <td className="p-2 border">
                {stt.user ? `${stt.user.firstName} ${stt.user.lastName}` : stt.userID}
              </td>
              <td className="p-2 border">{stt.emailNotifications ? "Yes" : "No"}</td>
              <td className="p-2 border">{stt.pushNotifications ? "Yes" : "No"}</td>
              <td className="p-2 border">
                {new Date(stt.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-6 mt-4">
        <button
          disabled={!pagination.prev_page_url}
          onClick={() => loadPage(pagination.current_page - 1)}
          className="text-primary-dark font-bold text-lg"
        >
          Prev
        </button>

        <button
          disabled={!pagination.next_page_url}
          onClick={() => loadPage(pagination.current_page + 1)}
          className="text-primary-dark font-bold text-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
