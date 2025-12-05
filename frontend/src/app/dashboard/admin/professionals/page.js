"use client";
import { useEffect, useState } from "react";
import { getProfessionals, deleteProfessional } from "@/lib/professionals";
import Link from "next/link";
import Modal from "@/components/ui/Modal";

export default function ProfessionalsPage() {
  const [professionals, setProfessionals] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const loadData = async () => {
    try {
      const data = await getProfessionals();
      setProfessionals(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load professionals.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const confirmDelete = async () => {
    try {
      await deleteProfessional(deleteId);
      setOpenDeleteModal(false);
      setDeleteId(null);

      await loadData();
    } catch (err) {
      console.error(err);
      alert("Error deleting professional.");
    }
  };

  return (
    <div className="p-6">
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <h2 className="text-xl font-bold mb-4">Delete Professional</h2>
        <p className="mb-4">Are you sure you want to delete this professional?</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpenDeleteModal(false)}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </Modal>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-primary-dark font-bold">Professionals</h1>

        <Link
          href="/dashboard/admin/professionals/create"
          className="bg-primary-dark text-white px-4 py-2 rounded"
        >
          + Create Professional
        </Link>
      </div>

      <table className="w-full text-primary-dark border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Specialization</th>
            <th className="p-2 border">License</th>
            <th className="p-2 border">Experience</th>
            <th className="p-2 border">Education</th>
            <th className="p-2 border">Clinic</th>
            <th className="p-2 border">Bio</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {professionals.map((p) => (
            <tr key={p.professionalID}>
              <td className="p-2 border">{p.professionalID}</td>
              <td className="p-2 border">
                {p.user?.firstName} {p.user?.lastName}
              </td>
              <td className="p-2 border">{p.specialization}</td>
              <td className="p-2 border">{p.licenseNumber}</td>
              <td className="p-2 border">{p.experienceYears}</td>
              <td className="p-2 border">{p.education}</td>
              <td className="p-2 border">
                {p.clinicName} — {p.clinicCity}, {p.clinicStreet}
              </td>
              <td className="p-2 border">{p.bio}</td>

              <td className="p-2 border flex gap-2">
                <Link
                  href={`/dashboard/admin/professionals/${p.professionalID}/edit`}
                  className="px-3 py-1 bg-primary-pink text-white rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => {
                    setDeleteId(p.professionalID);
                    setOpenDeleteModal(true);
                  }}
                  className="px-3 py-1 bg-primary-purple text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {professionals.length === 0 && (
            <tr>
              <td colSpan="9" className="p-4 text-center">
                No professionals found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
