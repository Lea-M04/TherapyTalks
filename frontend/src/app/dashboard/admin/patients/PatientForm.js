"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";

import {
  createPatient,
  updatePatient,
  getPatientById,
} from "@/lib/patients";

import { getUsersWithoutPatient } from "@/lib/patients";

export default function PatientForm({ params }) {
  const router = useRouter();

  let patientId = null;
  if (params?.id && params.id !== "create") {
    patientId = params.id;
  }

  const isEdit = patientId !== null;

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    userID: "",
    medicalHistory: "",
    allergies: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    insuranceNumber: "",
    pseudonym: "",
  });

  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    if (!isEdit) {
      getUsersWithoutPatient().then(setUsers);
    }
  }, [isEdit]);

  useEffect(() => {
    if (isEdit) {
      getPatientById(patientId).then((p) => {
        console.log("API RESPONSE:", p);

        setForm({
          medicalHistory: p.medicalHistory ?? "",
          allergies: p.allergies ?? "",
          emergencyContactName: p.emergencyContactName ?? "",
          emergencyContactPhone: p.emergencyContactPhone ?? "",
          insuranceNumber: p.insuranceNumber ?? "",
          pseudonym: p.pseudonym ?? "",
        });
      });
    }
  }, [isEdit, patientId]);

  const submit = async () => {
    try {
      if (isEdit) {
        await updatePatient(patientId, form);
      } else {
        await createPatient(form);
      }

      setSuccessModal(true);

      setTimeout(() => {
        setSuccessModal(false);
        router.push("/dashboard/admin/patients");
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorModal(true);
    }
  };

  return (
    <div className="p-6 text-primary-dark">
      <h1 className="text-xl font-bold mb-4">
        {isEdit ? "Edit Patient" : "Create Patient"}
      </h1>

      <div className="space-y-4">
        {!isEdit && (
          <div>
            <label>Select User</label>
            <select
              value={form.userID}
              onChange={(e) => setForm({ ...form, userID: e.target.value })}
              className="w-full border p-2"
            >
              <option value="">Choose a user</option>
              {users.map((u) => (
                <option key={u.userID} value={u.userID}>
                  {u.firstName} {u.lastName} ({u.email})
                </option>
              ))}
            </select>
          </div>
        )}

        <input
          type="text"
          placeholder="Medical History"
          className="w-full border p-2"
          value={form.medicalHistory}
          onChange={(e) => setForm({ ...form, medicalHistory: e.target.value })}
        />

        <input
          type="text"
          placeholder="Allergies"
          className="w-full border p-2"
          value={form.allergies}
          onChange={(e) => setForm({ ...form, allergies: e.target.value })}
        />


        <input
          type="text"
          placeholder="emergencyContactName"
          className="w-full border p-2"
          value={form.emergencyContactName}
          onChange={(e) => setForm({ ...form, emergencyContactName: e.target.value })}
        />

        <input
          type="text"
          placeholder="emergencyContactPhone"
          className="w-full border p-2"
          value={form.emergencyContactPhone}
          onChange={(e) => setForm({ ...form, emergencyContactPhone: e.target.value })}
        />

        <input
          type="text"
          placeholder="insuranceNumber"
          className="w-full border p-2"
          value={form.insuranceNumber}
          onChange={(e) =>
            setForm({ ...form, insuranceNumber: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Pseudonym"
          className="w-full border p-2"
          value={form.pseudonym}
          onChange={(e) => setForm({ ...form, pseudonym: e.target.value })}
        />

        <button
          onClick={submit}
          className="bg-primary-dark text-white px-6 py-2 rounded"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </div>

      <Modal open={successModal} onClose={() => setSuccessModal(false)}>
        <h2 className="text-xl font-semibold mb-2">
          {isEdit ? "Updated Successfully!" : "Created Successfully!"}
        </h2>
        <p className="text-gray-700">
          Redirecting to patients page...
        </p>
      </Modal>

      <Modal open={errorModal} onClose={() => setErrorModal(false)}>
        <h2 className="text-xl font-semibold text-red-600 mb-2">
          Error!
        </h2>
        <p className="text-gray-700">
          Something went wrong. Please try again.
        </p>
      </Modal>
    </div>
  );
}
