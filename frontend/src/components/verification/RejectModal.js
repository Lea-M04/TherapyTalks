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
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-white w-96 p-6 rounded-xl shadow-lg border border-primary/30 animate-fadeIn">
      
      <h3 className="text-xl font-bold 
        bg-gradient-to-r from-primary-dark via-primary-purple to-primary-pink
        text-transparent bg-clip-text mb-4">
        Reject Request
      </h3>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Reason title"
        className="w-full border border-primary/40 p-2 rounded-lg focus:ring-2 
        focus:ring-primary-purple focus:outline-none transition text-primary-dark"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="w-full border border-primary/40 p-2 rounded-lg h-24 mt-3
        focus:ring-2 focus:ring-primary-purple focus:outline-none transition text-primary-dark"
      />


      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-primary-pink text-white 
          hover:bg-primary-pink-hover transition"
        >
          Cancel
        </button>

        <button
          onClick={submit}
          className="px-4 py-2 rounded-lg bg-primary-purple text-white 
          hover:bg-primary-purple-hover transition"
        >
          Reject
        </button>
      </div>
    </div>
  </div>
);
}