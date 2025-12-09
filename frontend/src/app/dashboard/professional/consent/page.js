"use client";
import { useEffect, useState } from "react";
import { getTemplatesByProfessional, createConsent, updateConsent, deleteConsent, } from "@/lib/consent";
import { useAuth } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfessionalConsentEditor() {
  const { user } = useAuth();
  const profID = user?.professional?.professionalID;
  const router = useRouter();

  const [templates, setTemplates] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    consentType: "treatment",
    description: "",
  });
const toMySQLDate = (d) => {
  return new Date(d).toISOString().slice(0, 19).replace("T", " ");
};
  useEffect(() => {
    if (!profID) return;
   getTemplatesByProfessional(profID)
  .then(res => {
    setTemplates(res)})
  .catch(console.error);

  }, [profID]);

  const saveTemplate = async () => {
    if (editing) {
      await updateConsent(editing.consentID, { ...form, patientID: null, professionalID: profID });
      alert("Template updated");
    } else {
      const created = await createConsent({ ...form, patientID: null, professionalID: profID,  signedAt: toMySQLDate(new Date()) });
      alert("Template created");
    }

    const t = await getTemplatesByProfessional(profID);
    setTemplates(t);
    setEditing(null);
    setForm({ consentType: "treatment", description: "" });
  };

  const startEdit = (tpl) => {
    setEditing(tpl);
    setForm({ consentType: tpl.consentType, description: tpl.description || "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this template?")) return;

    await deleteConsent(id);
    const t = await getTemplatesByProfessional(profID);
    setTemplates(t);
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Consent Templates</h1>

      <div className="mb-6 bg-white p-4 rounded shadow">
        <select value={form.consentType} onChange={(e) => setForm({ ...form, consentType: e.target.value })} className="border p-2 rounded w-full mb-3">
          <option value="treatment">Treatment</option>
          <option value="data_share">Data Sharing</option>
          <option value="communication">Communication</option>
        </select>

        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border p-2 rounded w-full" rows={4} placeholder="Consent text shown to patients" />

        <div className="mt-3 flex gap-3">
          <button onClick={saveTemplate} className="px-4 py-2 bg-blue-600 text-white rounded">Save Template</button>
          <button onClick={() => { setEditing(null); setForm({ consentType: "treatment", description: "" }); }} className="px-4 py-2 border rounded">Clear</button>
        </div>
      </div>

      <h2 className="font-semibold mb-2">Existing templates</h2>
      <div className="space-y-3">
        {templates.map(t => (
          <div key={t.consentID} className="p-3 border rounded bg-white flex justify-between items-start">
            <div>
              <div className="font-semibold">{t.consentType} {t.patientID ? `(patient ${t.patientID})` : "(template)"}</div>
              <div className="text-sm text-gray-700">{t.description}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(t)} className="px-3 py-1 border rounded">Edit</button>
            </div>
             {!t.patientID && (
                <button
                  onClick={() => handleDelete(t.consentID)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              )}
          </div>
        ))}
      </div>
    </div>
  );
}
