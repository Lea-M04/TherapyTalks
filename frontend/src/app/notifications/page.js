"use client";

import { useEffect, useState } from "react";
import { getNotifications, markNotificationRead, deleteNotification } from "@/lib/notification";
import { useRouter } from "next/navigation";

export default function NotificationsPage() {
  const [list, setList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getNotifications();

    const data = Array.isArray(res.data)
      ? res.data
      : res.data?.data ?? [];

    setList(data);
  }

  async function openNotification(n) {
    await markNotificationRead(n.notificationID);
   setList(prev => prev.filter(x => x.notificationID !== n.notificationID));
    if (n.link) {
      router.push(n.link);
    }
  }

  async function handleDelete(id) {
    await deleteNotification(id);
     setList(prev => prev.filter(x => x.notificationID !== id));
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      <div className="space-y-4">
        {list.map(n => (
          <div
            key={n.notificationID}
            className="p-4 border text-primary-dark rounded bg-white shadow cursor-pointer hover:bg-gray-50"
            onClick={() => openNotification(n)}
          >
            <p className="font-semibold">{n.title}</p>
            <p>{n.message}</p>

            <div className="flex gap-4 mt-3">
              {!n.isRead && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openNotification(n);
                  }}
                  className="text-blue-600"
                >
                  Mark as read & open
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(n.notificationID);
                }}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
