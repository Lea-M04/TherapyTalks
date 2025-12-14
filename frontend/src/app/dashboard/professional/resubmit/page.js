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
    <div className="p-6 text-white">
      <h1 className="text-xl font-bold mb-4">Resubmit Verification</h1>

      <select
        className="w-full p-2 mb-4 text-black"
        value={documentType}
        onChange={(e) => setDocumentType(e.target.value)}
      >
        <option value="license">License</option>
        <option value="id_card">ID Card</option>
        <option value="certificate">Certificate</option>
      </select>

      <input 
        type="file"
        className="w-full p-2 text-black mb-4"
        onChange={(e) => setDocument(e.target.files[0])}
      />

      <button
        onClick={submit}
        className="bg-primary-dark py-2 px-6 rounded"
      >
        Resubmit
      </button>
    </div>
  );
}
