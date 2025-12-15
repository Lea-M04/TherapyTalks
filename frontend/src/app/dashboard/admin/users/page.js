"use client";
import { useEffect, useState } from "react";
import { getUsersAdmin, deleteUser } from "@/lib/users";
import Link from "next/link";
import Modal from "@/components/ui/Modal";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
  current_page: 1,
  last_page: 1,
  per_page: 15,
  total: 0
});

  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const loadPage = async (page = 1) => {
  try {
    const res = await getUsersAdmin(`/users?page=${page}`);

  setUsers(res.data);
   console.log('response',res.data);
setPagination(res.meta);
 console.log('responseMeta',res.meta);

  } catch (err) {
    console.error(err);
    alert("Failed to load users.");
  }
};


  useEffect(() => {
    loadPage(1);
  }, []);

  const confirmDelete = async () => {
    try {
      await deleteUser(deleteId);
      setOpenDeleteModal(false);
      setDeleteId(null);

      await loadPage(pagination.current_page);
    } catch (err) {
      console.error(err);
      alert("Error deleting user.");
    }
  };

  return (
  <div className="p-6">

    <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
      <div className="p-6 bg-white rounded-lg shadow-lg border border-primary/20">
        <h2 className="text-xl font-bold mb-4 text-primary-dark">Delete User</h2>
        <p className="mb-4 text-primary-dark">Are you sure?</p>

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
        Users
      </h1>

      <Link 
        href="/dashboard/admin/users/create"
        className="bg-primary-purple text-white px-4 py-2 rounded-lg shadow hover:bg-primary-purple-hover transition"
      >
        + Create User
      </Link>
    </div>

    <div className="overflow-hidden rounded-lg border border-primary/20 shadow-sm bg-white">
      <table className="w-full text-primary-dark">
        <thead className="bg-primary/20">
          <tr>
            {["ID", "Name", "Email", "Username", "Phone", "Date of birth", "Gender", "Role", "Status", "Actions"].map((h) => (
              <th key={h} className="p-3 border border-primary/10 text-left text-sm font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr 
              key={u.userID}
              className="hover:bg-primary-pink/10 transition"
            >
              <td className="p-3 border border-primary/10">{u.userID}</td>
              <td className="p-3 border border-primary/10">{u.firstName} {u.lastName}</td>
              <td className="p-3 border border-primary/10">{u.email}</td>
              <td className="p-3 border border-primary/10">{u.username}</td>
              <td className="p-3 border border-primary/10">{u.phoneNumber}</td>
              <td className="p-3 border border-primary/10">{u.dateOfBirth}</td>
              <td className="p-3 border border-primary/10">{u.gender}</td>
              <td className="p-3 border border-primary/10">{u.role}</td>
              <td className="p-3 border border-primary/10">{u.status}</td>

              <td className="p-3 border border-primary/10 flex gap-2">
                <Link 
                  href={`/dashboard/admin/users/${u.userID}/edit`}
                  className="px-3 py-1 bg-primary-pink text-white rounded hover:bg-primary-pink-hover transition"
                >
                  Edit
                </Link>

                <button
                  onClick={() => { setDeleteId(u.userID); setOpenDeleteModal(true); }}
                  className="px-3 py-1 bg-primary-purple text-white rounded hover:bg-primary-purple-hover transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan="10" className="p-4 text-center text-primary-dark">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="flex justify-center items-center gap-6 mt-6 text-primary-dark">
      <button
        disabled={pagination.current_page <= 1}
        onClick={() => loadPage(pagination.current_page - 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 disabled:opacity-40 transition"
      >
        Prev
      </button>

      <button
        disabled={pagination.current_page >= pagination.last_page}
        onClick={() => loadPage(pagination.current_page + 1)}
        className="px-4 py-2 rounded bg-primary/20 hover:bg-primary/40 disabled:opacity-40 transition"
      >
        Next
      </button>
    </div>

  </div>
);
}