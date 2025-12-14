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
        <h2 className="text-xl font-bold mb-4">Delete User</h2>
        <p className="mb-4">Are you sure?</p>

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setOpenDeleteModal(false)}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={confirmDelete}>
            Delete
          </button>
        </div>
      </Modal>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-primary-dark">Users</h1>

        <Link href="/dashboard/admin/users/create"
          className="bg-primary-dark text-white px-4 py-2 rounded">
          + Create User
        </Link>
      </div>

      <table className="w-full text-primary-dark border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Date of birth</th>
            <th className="p-2 border">Gender</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.userID}>
              <td className="p-2 border">{u.userID}</td>
              <td className="p-2 border">
                {u.firstName} {u.lastName}
              </td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.username}</td>
              <td className="p-2 border">{u.phoneNumber}</td>
              <td className="p-2 border">{u.dateOfBirth}</td>
              <td className="p-2 border">{u.gender}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">{u.status}</td>

              <td className="p-2 border flex gap-2">
                <Link
                  href={`/dashboard/admin/users/${u.userID}/edit`}
                  className="px-3 py-1 bg-primary-pink text-white rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => {
                    setDeleteId(u.userID);
                    setOpenDeleteModal(true);
                  }}
                  className="px-3 py-1 bg-primary-purple text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-center items-center gap-6 mt-4 text-primary-dark">
        <button
  disabled={pagination.current_page <= 1}
  onClick={() => loadPage(pagination.current_page - 1)}
>
  Prev
</button>

<button
  disabled={pagination.current_page >= pagination.last_page}
  onClick={() => loadPage(pagination.current_page + 1)}
>
  Next
</button>

      </div>
    </div>
  );
}
