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
    <h1
      className="text-3xl font-bold mb-6 
                 bg-gradient-to-r from-primary-dark via-primary-purple to-primary-pink
                 text-transparent bg-clip-text"
    >
      Consent Templates
    </h1>

    <div className="mb-8 bg-white p-6 rounded-xl shadow-sm 
                    border border-primary/20">
      
      <select
        value={form.consentType}
        onChange={(e) => setForm({ ...form, consentType: e.target.value })}
        className="border border-primary/60 p-3 rounded-lg w-full mb-4
                   outline-none transition 
                   focus:border-primary-purple text-primary-dark"
      >
        <option value="treatment">Treatment</option>
        <option value="data_share">Data Sharing</option>
        <option value="communication">Communication</option>
      </select>

      <textarea
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="border border-primary/60 p-3 rounded-lg w-full 
                   outline-none transition 
                   focus:border-primary-purple text-primary-dark"
        rows={4}
        placeholder="Consent text shown to patients"
      />

      <div className="mt-5 flex gap-3">
        <button
          onClick={saveTemplate}
          className="px-5 py-2.5 bg-primary-purple text-white rounded-lg
                     shadow-sm transition 
                     hover:bg-primary-purple-hover"
        >
          Save Template
        </button>

        <button
          onClick={() => {
            setEditing(null);
            setForm({ consentType: "treatment", description: "" });
          }}
          className="px-5 py-2.5 border border-primary-purple rounded-lg
                     text-primary-purple transition 
                     hover:bg-primary-purple/10"
        >
          Clear
        </button>
      </div>
    </div>

    <h2 className="font-semibold mb-3 text-primary-dark text-lg">
      Existing Templates
    </h2>

    <div className="space-y-4">
      {templates.map((t) => (
        <div
          key={t.consentID}
          className="p-5 rounded-xl bg-white border border-primary/20 
                     shadow-sm flex justify-between items-start"
        >
          <div className="pr-6">
            <div className="font-semibold text-primary-dark">
              {t.consentType}{" "}
              {t.patientID ? `(patient ${t.patientID})` : "(template)"}
            </div>

            <div className="text-sm text-gray-700 mt-2">
              {t.description}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => startEdit(t)}
              className="px-3 py-1.5 rounded-lg text-primary-purple 
                         border border-primary-purple transition
                         hover:bg-primary-purple/10"
            >
              Edit
            </button>

            {!t.patientID && (
              <button
                onClick={() => handleDelete(t.consentID)}
                className="px-3 py-1.5 bg-primary-purple text-white rounded-lg
                           hover:bg-primary-purple-hover transition"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
}