"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { getDiagnosisByPatient, createDiagnosis, updateDiagnosis } from "@/lib/diagnoses";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DiagnosisPage(props) {
  const { user } = useAuth();
  const { patientID } = use(props.params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [diagnosisID, setDiagnosisID] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    securityLevel: "normal",
  });

  useEffect(() => {
    async function load() {
      const data = await getDiagnosisByPatient(patientID);
      const d = data[0];

      if (d) {
        setDiagnosisID(d.diagnosisID);
        setForm({
          title: d.title,
          description: d.description || "",
          securityLevel: d.securityLevel,
        });
      }
      setLoading(false);
    }

    load();
  }, [patientID]);

  const save = async () => {
    const payload = {
      ...form,
      patientID: Number(patientID),
      professionalID: user.professional.professionalID,
    };

    if (diagnosisID) {
      await updateDiagnosis(diagnosisID, payload);
      alert("Diagnosis updated!");
    } else {
      const res = await createDiagnosis(payload);
      alert("Diagnosis created!");
      setDiagnosisID(res.diagnosisID);
    }
    router.push("/dashboard/professional/mypatients");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
  <div className="p-6 max-w-2xl mx-auto">
    <h1 className="text-2xl font-bold mb-4 text-primary-purple">
      {diagnosisID ? "Edit Diagnosis" : "Add Diagnosis"}
    </h1>

    <div className="space-y-4 bg-white p-6 rounded-xl shadow-md border border-border">
      
      <input
        className="border border-border w-full p-3 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-primary-pink 
                   text-black placeholder-gray-500"
        placeholder="Diagnosis title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="border border-border w-full p-3 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-primary-purple 
                   text-black placeholder-gray-500"
        rows={5}
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <select
        className="border border-border w-full p-3 rounded-lg bg-white 
                   focus:outline-none focus:ring-2 focus:ring-primary-dark 
                   text-black"
        value={form.securityLevel}
        onChange={(e) => setForm({ ...form, securityLevel: e.target.value })}
      >
        <option value="normal">Normal</option>
        <option value="sensitive">Sensitive</option>
        <option value="private">Private</option>
      </select>

      <button
        onClick={save}
        className="bg-primary-purple text-white px-6 py-2 rounded-lg 
                   hover:bg-primary-purple-hover transition shadow-sm"
      >
        Save
      </button>
    </div>
  </div>
);
}
