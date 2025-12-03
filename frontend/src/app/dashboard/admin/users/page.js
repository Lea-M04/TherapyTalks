"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users")
      .then(res => {
        setUsers(res.data.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Username</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.userID}>
              <td className="p-2 border">{u.userID}</td>
              <td className="p-2 border">{u.firstName} {u.lastName}</td>
              
              <td className="p-2 border">
                {typeof u.email === "string" ? u.email : ""}
              </td>

              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border">{u.status}</td>
              <td className="p-2 border">{u.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
