"use client";

import { useEffect, useState } from "react";
import {
  getAllNotificationsAdmin,
  deleteNotification,
  markNotificationRead
} from "@/lib/notification";
import Modal from "@/components/ui/Modal";
import Link from "next/link";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const loadPage = async (page = 1) => {
    try {
      const res = await getAllNotificationsAdmin(page);

      setNotifications(res.data);
      setPagination(res); 
    } catch (err) {
      console.error(err);
      alert("Failed to load notifications");
    }
  };

  useEffect(() => {
    loadPage(1);
  }, []);

  const confirmDelete = async () => {
    try {
      await deleteNotification(deleteId);
      setOpenDeleteModal(false);
      setDeleteId(null);
      loadPage(pagination?.current_page || 1);
    } catch (err) {
      console.error(err);
      alert("Error deleting notification");
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markNotificationRead(id);
      loadPage(pagination?.current_page || 1);
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <div className="p-6">

    <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
      <div className="p-6 bg-white rounded-lg shadow-lg border border-primary/20">
        <h2 className="text-xl font-bold mb-4 text-primary-dark">
          Delete Notification
        </h2>

        <p className="mb-4 text-primary-dark">
          Are you sure you want to delete this notification?
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-primary-purple/20 text-primary-purple rounded
                       hover:bg-primary-purple-hover hover:text-white transition"
            onClick={() => setOpenDeleteModal(false)}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>

    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold 
                     bg-gradient-to-r from-primary-dark via-primary-purple to-primary-pink 
                     text-transparent bg-clip-text">
        Notifications
      </h1>

      <Link
        href="/dashboard/admin/notifications/create"
        className="bg-primary-purple text-white px-4 py-2 rounded-lg shadow 
                   hover:bg-primary-purple-hover transition"
      >
        + Create Notification
      </Link>
    </div>


    <div className="overflow-hidden rounded-lg border border-primary/20 shadow-sm bg-white">
      <table className="w-full text-primary-dark">
        <thead className="bg-primary/20">
          <tr>
            {["ID", "Title", "Message", "Type", "User", "Status", "Actions"].map((h) => (
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
          {notifications.map((n) => (
            <tr
              key={n.notificationID}
              className="hover:bg-primary-pink/10 transition"
            >
              <td className="p-3 border border-primary/10">{n.notificationID}</td>
              <td className="p-3 border border-primary/10">{n.title}</td>
              <td className="p-3 border border-primary/10">{n.message}</td>
              <td className="p-3 border border-primary/10">{n.type}</td>

              <td className="p-3 border border-primary/10">
                {n.user?.firstName} {n.user?.lastName}
              </td>

              <td className="p-3 border border-primary/10">
                <span
                  className={
                    n.isRead
                      ? "text-green-700 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {n.isRead ? "Read" : "Unread"}
                </span>
              </td>

              <td className="p-3 border border-primary/10 flex gap-2">
                {!n.isRead && (
                  <button
                    onClick={() => handleMarkRead(n.notificationID)}
                    className="px-3 py-1 bg-primary-pink text-white rounded 
                               hover:bg-primary-pink-hover transition"
                  >
                    Mark Read
                  </button>
                )}

                <button
                  onClick={() => {
                    setDeleteId(n.notificationID);
                    setOpenDeleteModal(true);
                  }}
                  className="px-3 py-1 bg-primary-purple text-white rounded
                             hover:bg-primary-purple-hover transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {notifications.length === 0 && (
            <tr>
              <td
                colSpan="7"
                className="p-4 text-center text-primary-dark"
              >
                No notifications found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="flex justify-center items-center gap-6 mt-6 text-primary-dark">
      <button
        disabled={!pagination?.prev_page_url}
        onClick={() => loadPage(pagination.current_page - 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 
                   disabled:opacity-40 transition"
      >
        Prev
      </button>

      <button
        disabled={!pagination?.next_page_url}
        onClick={() => loadPage(pagination.current_page + 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 
                   disabled:opacity-40 transition"
      >
        Next
      </button>
    </div>
  </div>
);
}