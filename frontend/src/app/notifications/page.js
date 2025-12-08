"use client";

import { useEffect, useState } from "react";
import { getNotifications, markNotificationRead, deleteNotification } from "@/lib/notification";

export default function NotificationsPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getNotifications();
    setList(res.data);
  }

  async function handleRead(id) {
    await markNotificationRead(id);
    load();
  }

  async function handleDelete(id) {
    await deleteNotification(id);
    load();
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      <div className="space-y-4">
        {list.map(n => (
          <div
            key={n.notificationID}
            className="p-4 border rounded bg-white shadow"
          >
            <p className="font-semibold">{n.title}</p>
            <p>{n.message}</p>
            <div className="flex gap-4 mt-3">
              {!n.isRead && (
                <button onClick={() => handleRead(n.notificationID)} className="text-blue-600">
                  Mark as read
                </button>
              )}
              <button onClick={() => handleDelete(n.notificationID)} className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
