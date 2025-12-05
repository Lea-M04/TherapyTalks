"use client";
import { useEffect, useState } from "react";
import { getPatients, deletePatient } from "@/lib/patients";
import Link from "next/link";
import Modal from "@/components/ui/Modal";

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const loadData = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load patients.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const confirmDelete = async () => {
    try {
      await deletePatient(deleteId);
      setOpenDeleteModal(false);
      setDeleteId(null);

      await loadData();
    } catch (err) {
      console.error(err);
      alert("Error deleting patient.");
    }
  };

  return (
    <div className="p-6">
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <h2 className="text-xl font-bold mb-4">Delete Patient</h2>
        <p className="mb-4">Are you sure you want to delete this patient?</p>

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
        <h1 className="text-2xl text-primary-dark font-bold">Patients</h1>

        <Link
          href="/dashboard/admin/patients/create"
          className="bg-primary-dark text-white px-4 py-2 rounded"
        >
          + Create Patient
        </Link>
      </div>

      <table className="w-full text-primary-dark border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Medical History</th>
            <th className="p-2 border">Allergies</th>
            <th className="p-2 border">Emergency Contact Name</th>
            <th className="p-2 border">Emergency Contact Phone</th>
            <th className="p-2 border">Insurance Number</th>
            <th className="p-2 border">Pseudonym</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((p) => (
            <tr key={p.patientID}>
              <td className="p-2 border">{p.patientID}</td>
              <td className="p-2 border">
                {p.user?.firstName} {p.user?.lastName}
              </td>
              <td className="p-2 border">{p.medicalHistory}</td>
              <td className="p-2 border">{p.allergies}</td>
              <td className="p-2 border">{p.emergencyContactName}</td>
              <td className="p-2 border">{p.emergencyContactPhone}</td>
              <td className="p-2 border">{p.insuranceNumber}</td>
              <td className="p-2 border">{p.pseudonym}</td>

              <td className="p-2 border flex gap-2">
                <Link
                  href={`/dashboard/admin/patients/${p.patientID}/edit`}
                  className="px-3 py-1 bg-primary-pink text-white rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => {
                    setDeleteId(p.patientID);
                    setOpenDeleteModal(true);
                  }}
                  className="px-3 py-1 bg-primary-purple text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {patients.length === 0 && (
            <tr>
              <td colSpan="9" className="p-4 text-center">
                No patients found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
