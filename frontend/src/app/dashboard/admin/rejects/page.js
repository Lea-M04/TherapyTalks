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
      <div className="p-6 bg-white rounded-lg shadow-lg border border-primary/20">
        <h2 className="text-xl font-bold mb-4 text-primary-dark">Delete Reason</h2>
        <p className="mb-4 text-primary-dark">
          A je e sigurt që don me e fshi këtë reason?
        </p>

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
        Reject Reasons
      </h1>
    </div>

    <div className="overflow-hidden rounded-lg border border-primary/20 shadow-sm bg-white">
      <table className="w-full text-primary-dark">
        <thead className="bg-primary/20">
          <tr>
            {["ID", "Request ID", "Professional", "Title", "Description", "Created At", "Actions"]
              .map((h) => (
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
          {reasons.map((reason) => (
            <tr
              key={reason.reasonID}
              className="hover:bg-primary-pink/10 transition"
            >
              <td className="p-3 border border-primary/10">{reason.reasonID}</td>
              <td className="p-3 border border-primary/10">{reason.request.requestID}</td>

              <td className="p-3 border border-primary/10">
                {reason.request?.professional
                  ? `${reason.request.professional.user.firstName} ${reason.request.professional.user.lastName}`
                  : "-"}
              </td>

              <td className="p-3 border border-primary/10">{reason.title}</td>
              <td className="p-3 border border-primary/10">{reason.description || "-"}</td>

              <td className="p-3 border border-primary/10">
                {new Date(reason.created_at).toLocaleString()}
              </td>

              <td className="p-3 border border-primary/10">
                <button
                  onClick={() => {
                    setDeleteId(reason.reasonID);
                    setOpenDeleteModal(true);
                  }}
                  className="px-3 py-1 bg-primary-purple text-white rounded hover:bg-primary-purple-hover transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {reasons.length === 0 && (
            <tr>
              <td colSpan="7" className="p-4 text-center text-primary-dark">
                No reject reasons found
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