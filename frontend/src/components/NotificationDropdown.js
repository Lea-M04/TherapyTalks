"use client";

import { useEffect, useState } from "react";
import { getNotifications, markNotificationRead } from "@/lib/notification";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
    const router = useRouter();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await getNotifications();
    console.log("DATA RECEIVED:", res.data);
     const list = Array.isArray(res.data)
    ? res.data
    : res.data?.data ?? [];

  setNotifications(list.filter(n => !n.isRead));
  }

  async function markAsRead(id) {
    await markNotificationRead(id);
    setNotifications(prev => prev.filter(n => n.notificationID !== id));
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative text-white"
      >
        🔔
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-600 text-xs px-1 rounded-full">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white text-black shadow-lg rounded p-3">
          <h4 onClick={()=>router.push("/notifications")}>View all</h4>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-600">No notifications</p>
          ) : (
            notifications.map(n => (
              <Link
                key={n.notificationID}
                href={n.link || "#"}
                className="p-2 border-b cursor-pointer hover:bg-gray-100"
                onClick={async (e) => {
                       e.preventDefault();
                    await markAsRead(n.notificationID);
                    setNotifications(prev => prev.filter(x => x.notificationID !== n.notificationID));
                    router.push(n.link);
                }}
                >
                <p className="font-semibold">{n.title}</p>
                <p className="text-sm">{n.message}</p>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

