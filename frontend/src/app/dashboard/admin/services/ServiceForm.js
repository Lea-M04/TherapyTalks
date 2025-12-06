"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";

import {
  createService,
  updateService,
  getServiceById,
  getProfessionals,
} from "@/lib/services";

export default function ServiceForm({ params }) {
  const router = useRouter();

  let serviceId = null;
  if (params?.id && params.id !== "create") {
    serviceId = params.id;
  }

  const isEdit = serviceId !== null;

  const [professionals, setProfessionals] = useState([]);
  const [form, setForm] = useState({
    professionalID: "",
    serviceName: "",
    description: "",
    durationMinutes: "",
    price: "",
    category: "",
    isActive: true,
  });

  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  useEffect(() => {
    if (!isEdit) {
      getProfessionals().then(setProfessionals);
    }
  }, [isEdit]);

  useEffect(() => {
    if (isEdit) {
      getServiceById(serviceId).then((s) => {
        setForm({
          professionalID: s.professionalID,
          serviceName: s.serviceName ?? "",
          description: s.description ?? "",
          durationMinutes: s.durationMinutes ?? "",
          price: s.price ?? "",
          category: s.category ?? "",
          isActive: s.isActive ?? true,
        });
      });
    }
  }, [isEdit, serviceId]);

  const submit = async () => {
    try {
      if (isEdit) {
        await updateService(serviceId, form);
      } else {
        await createService(form);
      }

      setSuccessModal(true);
      setTimeout(() => {
        setSuccessModal(false);
        router.push("/dashboard/admin/services");
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorModal(true);
    }
  };

  return (
    <div className="p-6 text-primary-dark">
      <h1 className="text-xl font-bold mb-4">
        {isEdit ? "Edit Service" : "Create Service"}
      </h1>

      <div className="space-y-4">

        {!isEdit && (
          <div>
            <label>Select Professional</label>
            <select
              value={form.professionalID}
              onChange={(e) =>
                setForm({ ...form, professionalID: e.target.value })
              }
              className="w-full border p-2"
            >
              <option value="">Choose a professional</option>
              {professionals.map((p) => (
                <option key={p.professionalID} value={p.professionalID}>
                  {p.user?.firstName} {p.user?.lastName}
                </option>
              ))}
            </select>
          </div>
        )}

        <input
          type="text"
          placeholder="Service Name"
          className="w-full border p-2"
          value={form.serviceName}
          onChange={(e) => setForm({ ...form, serviceName: e.target.value })}
        />

        <input
          type="text"
          placeholder="Description"
          className="w-full border p-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="text"
          placeholder="Duration (minutes)"
          className="w-full border p-2"
          value={form.durationMinutes}
          onChange={(e) =>
            setForm({ ...form, durationMinutes: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-2"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <input
          type="text"
          placeholder="Category"
          className="w-full border p-2"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <select
          className="w-full border p-2"
          value={form.isActive ? "1" : "0"}
          onChange={(e) =>
            setForm({ ...form, isActive: e.target.value === "1" })
          }
        >
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>

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
        <p className="text-gray-700">Redirecting to services page...</p>
      </Modal>

      <Modal open={errorModal} onClose={() => setErrorModal(false)}>
        <h2 className="text-xl font-semibold text-red-600 mb-2">Error!</h2>
        <p className="text-gray-700">Something went wrong. Please try again.</p>
      </Modal>
    </div>
  );
}
