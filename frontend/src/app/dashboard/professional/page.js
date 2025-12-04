"use client";
import ProfessionalGuard from "@/components/guards/ProfessionalGuard";
export default function ProfessionalHome() {
  return (
    <ProfessionalGuard>
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, Professional 👋</h1>

      <p className="text-gray-600">
        Here you can manage your schedule, bookings, clients, and chat.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <div className="p-4 bg-white border rounded shadow">
          <h2 className="font-semibold text-lg">Upcoming Sessions</h2>
          <p className="text-gray-600">No sessions scheduled.</p>
        </div>

        <div className="p-4 bg-white border rounded shadow">
          <h2 className="font-semibold text-lg">Your Availability</h2>
          <p className="text-gray-600">Update your schedule easily.</p>
        </div>

        <div className="p-4 bg-white border rounded shadow">
          <h2 className="font-semibold text-lg">Messages</h2>
          <p className="text-gray-600">Chat with clients in real‑time.</p>
        </div>

      </div>
    </div>
    </ProfessionalGuard>
  );
}
