"use client";
import { useState } from "react";
export default function ConsentPopup({ text, onAccept, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white text-primary-dark p-6 rounded-xl max-w-lg w-full shadow-xl">
        <h2 className="text-xl font-semibold mb-3">Consent Required</h2>

        <div className="p-3 border rounded bg-gray-50 max-h-64 overflow-y-auto text-sm">
          {text}
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">
            Close
          </button>

          <button
            onClick={onAccept}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
