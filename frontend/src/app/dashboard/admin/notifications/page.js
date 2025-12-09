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
     

      {pagination && (
        <>
          <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
            <h2 className="text-xl font-bold mb-4">Delete Notification</h2>
            <p className="mb-4">Are you sure you want to delete this notification?</p>

            <div className="flex justify-end gap-3">
              <button onClick={() => setOpenDeleteModal(false)} className="px-4 py-2 bg-gray-300 rounded">
                Cancel
              </button>

              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded">
                Delete
              </button>
            </div>
          </Modal>

          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl text-primary-dark font-bold">Notifications</h1>

            <Link href="/dashboard/admin/notifications/create" className="bg-primary-dark text-white px-4 py-2 rounded">
              + Create Notification
            </Link>
          </div>

          <table className="w-full text-primary-dark border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Message</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">User</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>

            <tbody>
              {notifications.map((n) => (
                <tr key={n.notificationID}>
                  <td className="p-2 border">{n.notificationID}</td>
                  <td className="p-2 border">{n.title}</td>
                  <td className="p-2 border">{n.message}</td>
                  <td className="p-2 border">{n.type}</td>
                  <td className="p-2 border">
                    {n.user?.firstName} {n.user?.lastName}
                  </td>
                  <td className="p-2 border">
                    {n.isRead ? "Read" : "Unread"}
                  </td>

                  <td className="p-2 border flex gap-2">
                    {!n.isRead && (
                      <button
                        onClick={() => handleMarkRead(n.notificationID)}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Mark Read
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setDeleteId(n.notificationID);
                        setOpenDeleteModal(true);
                      }}
                      className="px-3 py-1 bg-primary-purple text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {notifications.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-4 text-center">
                    No notifications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-center items-center gap-6 mt-3">
            <button
              disabled={!pagination?.prev_page_url}
              onClick={() => loadPage(pagination.current_page - 1)}
              className="text-primary-dark font-bold text-lg disabled:opacity-40"
            >
              Prev
            </button>

            <button
              disabled={!pagination?.next_page_url}
              onClick={() => loadPage(pagination.current_page + 1)}
              className="text-primary-dark font-bold text-lg disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
