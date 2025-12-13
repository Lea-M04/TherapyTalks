"use client";

import { useEffect, useState } from "react";
import { getRejectReasons, deleteRejectReason } from "@/lib/reasons";
import Modal from "@/components/ui/Modal";

export default function RejectReasonsPage() {
  const [reasons, setReasons] = useState([]);
  const [pagination, setPagination] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const loadPage = async (page = 1) => {
    try {
      const res = await getRejectReasons(page);
      setReasons(res.data);
      setPagination(res);
    } catch (err) {
      console.error(err);
      alert("Failed to load reject reasons.");
    }
  };

  useEffect(() => {
    loadPage(1);
  }, []);

  const confirmDelete = async () => {
    try {
      await deleteRejectReason(deleteId);
      setOpenDeleteModal(false);
      setDeleteId(null);

      await loadPage(pagination.current_page);
    } catch (err) {
      console.error(err);
      alert("Error deleting reject reason.");
    }
  };

  return (
    <div className="p-6">
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <h2 className="text-xl font-bold mb-4">Delete Reason</h2>
        <p className="mb-4">A je e sigurt që don me e fshi këtë reason?</p>

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

      <h1 className="text-2xl text-primary-dark font-bold mb-4">
        Reject Reasons
      </h1>

      <table className="w-full text-primary-dark border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Request ID</th>
            <th className="p-2 border">Professional</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {reasons.map((reason) => (
            <tr key={reason.reasonID}>
              <td className="p-2 border">{reason.reasonID}</td>
              <td className="p-2 border">{reason.request.requestID}</td>
              <td className="p-2 border">
                {reason.request?.professional
                  ? `${reason.request.professional.user.firstName} ${reason.request.professional.user.lastName}`
                  : "-"}
              </td>

              <td className="p-2 border">{reason.title}</td>
              <td className="p-2 border">{reason.description || "-"}</td>
              <td className="p-2 border">
                {new Date(reason.created_at).toLocaleString()}
              </td>

              <td className="p-2 border">
                <button
                  onClick={() => {
                    setDeleteId(reason.reasonID);
                    setOpenDeleteModal(true);
                  }}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {reasons.length === 0 && (
            <tr>
              <td colSpan="7" className="p-4 text-center">
                No reject reasons found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-center items-center gap-6 mt-4">
        <button
          disabled={!pagination.prev_page_url}
          onClick={() => loadPage(pagination.current_page - 1)}
          className="text-primary-dark font-bold text-lg disabled:opacity-50"
        >
          Prev
        </button>

        <button
          disabled={!pagination.next_page_url}
          onClick={() => loadPage(pagination.current_page + 1)}
          className="text-primary-dark font-bold text-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
