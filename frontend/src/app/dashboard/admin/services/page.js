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
        <h2 className="text-xl font-bold mb-4">Delete Service</h2>
        <p className="mb-4">Are you sure you want to delete this service?</p>

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
        <h1 className="text-2xl text-primary-dark font-bold">Services</h1>

        <Link
          href="/dashboard/admin/services/create"
          className="bg-primary-dark text-white px-4 py-2 rounded"
        >
          + Create Service
        </Link>
      </div>

      <table className="w-full text-primary-dark border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Professional</th>
            <th className="p-2 border">Service Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Active</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {services.map((s) => (
            <tr key={s.serviceID}>
              <td className="p-2 border">{s.serviceID}</td>
<td className="p-2 border">
  {s.professional?.user?.firstName} {s.professional?.user?.lastName}
</td>
              <td className="p-2 border">{s.serviceName}</td>
              <td className="p-2 border">{s.price}€</td>
              <td className="p-2 border">{s.category}</td>
              <td className="p-2 border">{s.isActive ? "Yes" : "No"}</td>

              <td className="p-2 border flex gap-2">
                <Link
                  href={`/dashboard/admin/services/${s.serviceID}/edit`}
                  className="px-3 py-1 bg-primary-pink text-white rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => {
                    setDeleteId(s.serviceID);
                    setOpenDeleteModal(true);
                  }}
                  className="px-3 py-1 bg-primary-purple text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {services.length === 0 && (
            <tr>
              <td colSpan="7" className="p-4 text-center">
                No services found
              </td>
            </tr>
          )}
        </tbody>
      </table>
       <div className="flex justify-center items-center gap-6">
      <button
  disabled={!pagination.prev_page_url}
  onClick={() => loadData(pagination.current_page - 1)}
  className="text-primary-dark font-bold text-lg "
>
  Prev
</button>

<button
  disabled={!pagination.next_page_url}
  onClick={() => loadData(pagination.current_page + 1)}
   className="text-primary-dark font-bold text-lg"
>
  Next
</button></div>
    </div>
  );
}
