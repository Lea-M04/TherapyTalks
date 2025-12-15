"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/axios";

export default function ResubmitVerificationPage() {
  const search = useSearchParams();
  const requestID = search.get("id");
  const router = useRouter();

  const [document, setDocument] = useState(null);
  const [documentType, setDocumentType] = useState("license");

  const submit = async () => {
    const form = new FormData();
    form.append("documentType", documentType);
    form.append("document", document);

    try {
      await api.post(`/verification/${requestID}/resubmit`, form, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      router.push("/dashboard/professional");
    } catch (err) {
      console.log(err);
      alert("Failed to resubmit!");
    }
  };

  return (
  <div className="p-6 text-primary-dark">

    <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary-dark via-primary-purple to-primary-pink text-transparent bg-clip-text">
      Resubmit Verification
    </h1>

    <div className="bg-white p-6 rounded-lg shadow-lg border border-primary/20 space-y-4">

      <div>
        <label className="block mb-2 font-semibold">Document Type</label>
        <select
          className="w-full p-2 rounded border border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary-purple text-primary-dark"
          value={documentType}
          onChange={(e) => setDocumentType(e.target.value)}
        >
          <option value="license">License</option>
          <option value="id_card">ID Card</option>
          <option value="certificate">Certificate</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-semibold">Upload Document</label>
        <input
          type="file"
          className="w-full p-2 rounded border border-primary/20 bg-white text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-purple"
          onChange={(e) => setDocument(e.target.files[0])}
        />
      </div>

      <button
        onClick={submit}
        className="w-full py-2 bg-primary-purple text-white rounded-lg shadow hover:bg-primary-purple-hover transition"
      >
        Resubmit
      </button>

    </div>

  </div>
);
}
