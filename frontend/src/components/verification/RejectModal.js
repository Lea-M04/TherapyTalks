"use client";

import { useState } from "react";

export default function RejectModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = () => {
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    onSubmit({ title, description, adminComment: description });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="text-lg font-semibold text-red-600">Reject Request</h3>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Reason title"
          className="w-full border p-2 rounded mt-3"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full border p-2 rounded mt-2 h-24"
        />
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
          <button onClick={submit} className="px-3 py-1 bg-red-600 text-white rounded">Reject</button>
        </div>
      </div>
    </div>
  );
}
