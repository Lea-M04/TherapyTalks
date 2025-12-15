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
  <div className="p-10 max-w-3xl mx-auto">
    <h1 className="text-3xl font-bold mb-8 text-primary-dark">
      Notifications
    </h1>

    <div className="space-y-4">
      {list.map((n) => (
        <div
          key={n.notificationID}
          onClick={() => openNotification(n)}
          className="
            p-5 rounded-xl border bg-white text-primary-dark shadow-sm
            cursor-pointer transition 
            hover:shadow-md hover:border-primary-purple hover:-translate-y-1
          "
        >
          <p className="font-semibold text-lg">{n.title}</p>
          <p className="text-gray-700 mt-1">{n.message}</p>

          <div className="flex gap-5 mt-4">
            {!n.isRead && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openNotification(n);
                }}
                className="text-primary-purple font-medium hover:underline"
              >
                Mark as read & open
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(n.notificationID);
              }}
              className="text-red-600 font-medium hover:underline"
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