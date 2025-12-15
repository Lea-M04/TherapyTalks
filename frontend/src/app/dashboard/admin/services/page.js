"use client";

import { useEffect, useState } from "react";
import { getAllServices, deleteService } from "@/lib/services";
import { getProfessionalById } from "@/lib/professionals"; 
import Link from "next/link";
import Modal from "@/components/ui/Modal";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
const [pagination, setPagination] = useState({});

  const loadData = async (page = 1) => {
  try {
    const result = await getAllServices(page);
console.log(JSON.stringify(result, null, 2));

 const servicesData = result.data ?? result; 
    const paginationData = {
      ...result.meta,
      prev_page_url: result.prev_page_url,
      next_page_url: result.next_page_url
    };

    setServices(servicesData);
    setPagination(paginationData);

  } catch (err) {
    console.error(err);
    alert("Failed to load services.");
  }
};

  useEffect(() => {
    loadData();
  }, []);

  const confirmDelete = async () => {
    try {
      await deleteService(deleteId);
      setOpenDeleteModal(false);
      setDeleteId(null);
      await loadData();
    } catch (err) {
      console.error(err);
      alert("Error deleting service.");
    }
  };

  return (
  <div className="p-6">

    <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
      <div className="p-6 bg-white rounded-lg shadow-lg border border-primary/20">
        <h2 className="text-xl font-bold mb-4 text-primary-dark">Delete Service</h2>
        <p className="mb-4 text-primary-dark">Are you sure you want to delete this service?</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpenDeleteModal(false)}
            className="px-4 py-2 bg-primary-purple/20 text-primary-purple rounded hover:bg-primary-purple-hover hover:text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>

    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-dark via-primary-purple to-primary-pink text-transparent bg-clip-text">
        Services
      </h1>

      <Link
        href="/dashboard/admin/services/create"
        className="bg-primary-purple text-white px-4 py-2 rounded-lg shadow hover:bg-primary-purple-hover transition"
      >
        + Create Service
      </Link>
    </div>

    <div className="overflow-hidden rounded-lg border border-primary/20 shadow-sm bg-white">
      <table className="w-full text-primary-dark">
        <thead className="bg-primary/20">
          <tr>
            {["ID", "Professional", "Service Name", "Price", "Category", "Active", "Actions"].map((h) => (
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
          {services.map((s) => (
            <tr key={s.serviceID} className="hover:bg-primary-pink/10 transition">
              <td className="p-3 border border-primary/10">{s.serviceID}</td>
              <td className="p-3 border border-primary/10">
                {s.professional?.user?.firstName} {s.professional?.user?.lastName}
              </td>
              <td className="p-3 border border-primary/10">{s.serviceName}</td>
              <td className="p-3 border border-primary/10">{s.price}€</td>
              <td className="p-3 border border-primary/10">{s.category}</td>
              <td className="p-3 border border-primary/10">{s.isActive ? "Yes" : "No"}</td>

              <td className="p-3 border border-primary/10 flex gap-2">
                <Link
                  href={`/dashboard/admin/services/${s.serviceID}/edit`}
                  className="px-3 py-1 bg-primary-pink text-white rounded hover:bg-primary-pink-hover transition"
                >
                  Edit
                </Link>

                <button
                  onClick={() => {
                    setDeleteId(s.serviceID);
                    setOpenDeleteModal(true);
                  }}
                  className="px-3 py-1 bg-primary-purple text-white rounded hover:bg-primary-purple-hover transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {services.length === 0 && (
            <tr>
              <td colSpan="7" className="p-4 text-center text-primary-dark">
                No services found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="flex justify-center items-center gap-6 mt-6 text-primary-dark">
      <button
        disabled={!pagination.prev_page_url}
        onClick={() => loadData(pagination.current_page - 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 disabled:opacity-40 transition"
      >
        Prev
      </button>

      <button
        disabled={!pagination.next_page_url}
        onClick={() => loadData(pagination.current_page + 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 disabled:opacity-40 transition"
      >
        Next
      </button>
    </div>
  </div>
);
}