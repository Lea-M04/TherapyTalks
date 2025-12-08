"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { createNotification } from "@/lib/notification";

export default function NotificationForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "system",
    userID: "",
    link: "",
  });

  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const submit = async () => {
    try {
      await createNotification(form);

      setSuccessModal(true);

      setTimeout(() => {
        setSuccessModal(false);
        router.push("/dashboard/admin/notifications");
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorModal(true);
    }
  };

  return (
    <div className="p-6 text-primary-dark">
      <h1 className="text-xl font-bold mb-4">Create Notification</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          placeholder="Message"
          className="w-full border p-2"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        ></textarea>

        <select
          className="w-full border p-2"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="system">System</option>
          <option value="booking">Booking</option>
          <option value="message">Message</option>
          <option value="alert">Alert</option>
          <option value="info">Info</option>
        </select>

        <input
          type="number"
          placeholder="User ID"
          className="w-full border p-2"
          value={form.userID}
          onChange={(e) => setForm({ ...form, userID: e.target.value })}
        />

        <input
          type="text"
          placeholder="Link (optional)"
          className="w-full border p-2"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
        />

        <button
          onClick={submit}
          className="bg-primary-dark text-white px-6 py-2 rounded"
        >
          Create
        </button>
      </div>

      <Modal open={successModal} onClose={() => setSuccessModal(false)}>
        <h2 className="text-xl font-semibold mb-2">Created Successfully!</h2>
        <p className="text-gray-700">Redirecting to notifications page...</p>
      </Modal>

      <Modal open={errorModal} onClose={() => setErrorModal(false)}>
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error!</h2>
        <p className="text-gray-700">Something went wrong. Please try again.</p>
      </Modal>
    </div>
  );
}
