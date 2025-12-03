"use client";
import AdminSidebar from "./admin/components/AdminSidebar";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>
    </div>
  );
}
