"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUserById, createUser, updateUser } from "@/lib/users";
import Modal from "@/components/ui/Modal";

export default function UserForm({ params }) {
  const router = useRouter();

  const userId = params?.id !== "create" ? params.id : null;
  const isEdit = !!userId;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    role: "",
    status: "",
    username: "",
    password: "",
    profileImage: null,
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (isEdit) {
      getUserById(userId).then((u) => {
         const data = u.data;
        setForm({
          firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    phoneNumber: data.phoneNumber ?? "",
    email: data.email ?? "",
    dateOfBirth: data.dateOfBirth ?? "",
    gender: data.gender ?? "",
    role: data.role ?? "",
    status: data.status ?? "",
    username: data.username ?? "",
    password: "",
    profileImage: null,
        });
      });
    }
  }, [isEdit, userId]);

  const submit = async () => {
    try {
      const data = new FormData();
      Object.keys(form).forEach((key) => {
        if (form[key] !== null && form[key] !== "") {
          data.append(key, form[key]);
        }
      });

      if (isEdit) {
        await updateUser(userId, data);
      } else {
        await createUser(data);
      }

      setSuccess(true);
      setTimeout(() => router.push("/dashboard/admin/users"), 1500);
    } catch (e) {
      console.error(e);
      setError(true);
    }
  };

  return (
    <div className="p-6 text-primary-dark">
      <h1 className="text-xl font-bold mb-4">
        {isEdit ? "Edit User" : "Create User"}
      </h1>

      <div className="space-y-4">

        <input
          className="w-full border p-2"
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />

        <input
          className="w-full border p-2"
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />

        <input
          className="w-full border p-2"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
        />

        <input
          type="email"
          className="w-full border p-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="date"
          className="w-full border p-2"
          value={form.dateOfBirth}
          onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
        />

        <select
          className="w-full border p-2"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <select
          className="w-full border p-2"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="">Select Role</option>
          <option value="patient">Patient</option>
          <option value="professional">Professional</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="auditor">Auditor</option>
        </select>

        <select
          className="w-full border p-2"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="banned">Banned</option>
        </select>

        <input
          className="w-full border p-2"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        {!isEdit && (
          <input
            type="password"
            className="w-full border p-2"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        )}

        Profile Image
        <input
          type="file"
          className="w-full"
          onChange={(e) => setForm({ ...form, profileImage: e.target.files[0] })}
        />

        <button
          onClick={submit}
          className="bg-primary-dark text-white px-6 py-2 rounded"
        >
          {isEdit ? "Update" : "Create"}
        </button>
      </div>

      <Modal open={success} onClose={() => setSuccess(false)}>
        <h2 className="text-xl font-semibold mb-2">
          {isEdit ? "Updated Successfully!" : "Created Successfully!"}
        </h2>
        <p>Redirecting...</p>
      </Modal>

      <Modal open={error} onClose={() => setError(false)}>
        <h2 className="text-xl text-red-600 font-semibold mb-2">Error!</h2>
        <p>Something went wrong.</p>
      </Modal>
    </div>
  );
}
