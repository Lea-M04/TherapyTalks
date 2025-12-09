"use client";
import { useEffect, useState } from "react";
import { createConsent } from "@/lib/consent";
import { getPatientsAll } from "@/lib/patients";
import { getProfessionals } from "@/lib/professionals";
import { useRouter } from "next/navigation";

export default function CreateConsent() {
  const router = useRouter();

  const [patients, setPatients] = useState([]);
  const [professionals, setProfessionals] = useState([]);

  const [form, setForm] = useState({
    consentType: "",
    description: "",
    patientID: "",
    professionalID: "",
     signedAt: "",
  });

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const p = await getPatientsAll();
    const pr = await getProfessionals();

    setPatients(p.data);
    setProfessionals(pr);
  };

  const submit = async () => {
    try {
      await createConsent(form);
      router.push("/dashboard/admin/consents");
    } catch (err) {
      console.error(err);
      alert("Error creating consent");
    }
  };

  return (
    <div className="p-6 text-primary-dark">
      <h1 className="text-xl font-bold mb-4">Create Consent</h1>

      <div className="space-y-4">
      <select
        value={form.consentType}
        onChange={e => setForm({ ...form, consentType: e.target.value })}
        className="w-full border p-2"
      >
        <option value="">Select Consent Type</option>
        <option value="treatment">Treatment</option>
        <option value="data_share">Data Sharing</option>
        <option value="communication">Communication</option>
      </select>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="w-full border p-2"
        />

        <select
          value={form.patientID}
          onChange={e => setForm({ ...form, patientID: e.target.value })}
          className="w-full border p-2"
        >
          <option value="">Select Patient</option>
          {patients.map(p => (
            <option key={p.patientID} value={p.patientID}>
              {p.user?.firstName} {p.user?.lastName}
            </option>
          ))}
        </select>

        <select
          value={form.professionalID}
          onChange={e => setForm({ ...form, professionalID: e.target.value })}
          className="w-full border p-2"
        >
          <option value="">Select Professional</option>
          {professionals.map(pr => (
            <option key={pr.professionalID} value={pr.professionalID}>
              {pr.user?.firstName} {pr.user?.lastName}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.signedAt}
          onChange={e => setForm({ ...form, signedAt: e.target.value })}
          className="w-full border p-2"
        />


        <button
          onClick={submit}
          className="bg-primary-dark text-white px-6 py-2 rounded"
        >
          Create
        </button>
      </div>
    </div>
  );
}
