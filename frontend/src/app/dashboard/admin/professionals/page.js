"use client";
import { useEffect, useState } from "react";
import { getProfessionalsAdmin, deleteProfessional } from "@/lib/professionals";
import Link from "next/link";
import Modal from "@/components/ui/Modal";

export default function ProfessionalsPage() {
  const [professionals, setProfessionals] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
const [pagination, setPagination] = useState({});

 const loadPage = async (page = 1) => {
  try {
    const res = await getProfessionalsAdmin(`/professionals?page=${page}`);
    setProfessionals(res.data);    
    setPagination(res.meta);  
  } catch (err) {
    console.error(err);
    alert("Failed to load professionals.");
  }
};
  useEffect(() => {
    loadPage(1);
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
      <div className="p-6 bg-white rounded-lg shadow-lg border border-primary/20">
        <h2 className="text-xl font-bold mb-4 text-primary-dark">Delete Professional</h2>
        <p className="mb-4 text-primary-dark">
          Are you sure you want to delete this professional?
        </p>

        <div className="flex justify-end gap-3">
          <button 
            className="px-4 py-2 bg-primary-purple/20 text-primary-purple rounded hover:bg-primary-purple-hover hover:text-white transition"
            onClick={() => setOpenDeleteModal(false)}
          >
            Cancel
          </button>

          <button 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            onClick={confirmDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>

    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-dark via-primary-purple to-primary-pink text-transparent bg-clip-text">
        Professionals
      </h1>

      <Link
        href="/dashboard/admin/professionals/create"
        className="bg-primary-purple text-white px-4 py-2 rounded-lg shadow hover:bg-primary-purple-hover transition"
      >
        + Create Professional
      </Link>
    </div>

    <div className="overflow-hidden rounded-lg border border-primary/20 shadow-sm bg-white">
      <table className="w-full text-primary-dark">
        <thead className="bg-primary/20">
          <tr>
            {[
              "ID", "User", "Specialization", "License", "Experience",
              "Education", "Clinic", "Bio", "Actions"
            ].map((h) => (
              <th 
                key={h} 
                className="p-3 border border-primary/10 text-left text-sm font-semibold"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {professionals.map((p) => (
            <tr 
              key={p.professionalID}
              className="hover:bg-primary-pink/10 transition"
            >
              <td className="p-3 border border-primary/10">{p.professionalID}</td>
              <td className="p-3 border border-primary/10">
                {p.user?.firstName} {p.user?.lastName}
              </td>
              <td className="p-3 border border-primary/10">{p.specialization}</td>
              <td className="p-3 border border-primary/10">{p.licenseNumber}</td>
              <td className="p-3 border border-primary/10">{p.experienceYears}</td>
              <td className="p-3 border border-primary/10">{p.education}</td>
              <td className="p-3 border border-primary/10">
                {p.clinicName} — {p.clinicCity}, {p.clinicStreet}
              </td>
              <td className="p-3 border border-primary/10">{p.bio}</td>

              <td className="p-3 border border-primary/10 flex gap-2">
                <Link
                  href={`/dashboard/admin/professionals/${p.professionalID}/edit`}
                  className="px-3 py-1 bg-primary-pink text-white rounded hover:bg-primary-pink-hover transition"
                >
                  Edit
                </Link>

                <button
                  onClick={() => {
                    setDeleteId(p.professionalID);
                    setOpenDeleteModal(true);
                  }}
                  className="px-3 py-1 bg-primary-purple text-white rounded hover:bg-primary-purple-hover transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {professionals.length === 0 && (
            <tr>
              <td colSpan="9" className="p-4 text-center text-primary-dark">
                No professionals found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="flex justify-center items-center gap-6 mt-6 text-primary-dark">
      <button
        disabled={!pagination.prev_page_url}
        onClick={() => loadPage(pagination.current_page - 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 disabled:opacity-40 transition"
      >
        Prev
      </button>

      <button
        disabled={!pagination.next_page_url}
        onClick={() => loadPage(pagination.current_page + 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 disabled:opacity-40 transition"
      >
        Next
      </button>
    </div>
  </div>
);
}