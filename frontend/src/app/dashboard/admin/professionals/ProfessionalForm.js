"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";

import {
  createProfessional,
  updateProfessional,
  getProfessionalById,
} from "@/lib/professionals";

import { getUsersWithoutProfessional } from "@/lib/professionals";

export default function ProfessionalForm({ params }) {
  const router = useRouter();

  let professionalId = null;
  if (params?.id && params.id !== "create") {
    professionalId = params.id;
  }

  const isEdit = professionalId !== null;

  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    userID: "",
    specialization: "",
    licenseNumber: "",
    experienceYears: "",
    education: "",
    clinicName: "",
    clinicStreet: "",
    clinicCity: "",
    bio: "",
  });

  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    if (!isEdit) {
      getUsersWithoutProfessional().then(setUsers);
    }
  }, [isEdit]);

  useEffect(() => {
    if (isEdit) {
      getProfessionalById(professionalId).then((p) => {
        console.log("API RESPONSE:", p);

        setForm({
          specialization: p.specialization ?? "",
          licenseNumber: p.licenseNumber ?? "",
          experienceYears: p.experienceYears ?? "",
          education: p.education ?? "",
          clinicName: p.clinicName ?? "",
          clinicStreet: p.clinicStreet ?? "",
          clinicCity: p.clinicCity ?? "",
          bio: p.bio ?? "",
        });
      });
    }
  }, [isEdit, professionalId]);

  const submit = async () => {
    try {
      if (isEdit) {
        await updateProfessional(professionalId, form);
      } else {
        await createProfessional(form);
      }

      setSuccessModal(true);

      setTimeout(() => {
        setSuccessModal(false);
        router.push("/dashboard/admin/professionals");
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorModal(true);
    }
  };

  return (
    <div className="p-6 text-primary-dark">
      <h1 className="text-xl font-bold mb-4">
        {isEdit ? "Edit Professional" : "Create Professional"}
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
          placeholder="Specialization"
          className="w-full border p-2"
          value={form.specialization}
          onChange={(e) => setForm({ ...form, specialization: e.target.value })}
        />

        <input
          type="text"
          placeholder="License Number"
          className="w-full border p-2"
          value={form.licenseNumber}
          onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
        />

        <input
          type="number"
          placeholder="Experience Years"
          className="w-full border p-2"
          value={form.experienceYears}
          onChange={(e) =>
            setForm({ ...form, experienceYears: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Education"
          className="w-full border p-2"
          value={form.education}
          onChange={(e) => setForm({ ...form, education: e.target.value })}
        />

        <input
          type="text"
          placeholder="Clinic Name"
          className="w-full border p-2"
          value={form.clinicName}
          onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
        />

        <input
          type="text"
          placeholder="Clinic Street"
          className="w-full border p-2"
          value={form.clinicStreet}
          onChange={(e) =>
            setForm({ ...form, clinicStreet: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Clinic City"
          className="w-full border p-2"
          value={form.clinicCity}
          onChange={(e) => setForm({ ...form, clinicCity: e.target.value })}
        />

        <textarea
          placeholder="Bio"
          className="w-full border p-2"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        ></textarea>

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
          Redirecting to professionals page...
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
