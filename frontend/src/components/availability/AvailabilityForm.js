"use client";
import { useState } from "react";
import { createAvailability } from "@/lib/availability";

export default function AvailabilityForm({ professionalID, token, onCreated }) {
    const [form, setForm] = useState({
        dayOfWeek: "Mon",
        startTime: "09:00",
        endTime: "17:00",
        isAvailable: true,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createAvailability(
            { ...form, professionalID },
            token
        );

        onCreated();
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow mt-4 bg-white">
            <h2 className="text-xl font-semibold mb-3 text-primary-pink-hover">Add Availability</h2>

            <label className="block mb-2 font-bold text-primary-dark">Day of Week:</label>
            <select
                className="border p-2 rounded w-full font-bold text-primary-dark"
                value={form.dayOfWeek}
                onChange={(e) => setForm({ ...form, dayOfWeek: e.target.value })}
            >
                <option value="Mon">Mon</option>
                <option value="Tue">Tue</option>
                <option value="Wed">Wed</option>
                <option value="Thu">Thu</option>
                <option value="Fri">Fri</option>
                <option value="Sat">Sat</option>
                <option value="Sun">Sun</option>
            </select>

            <label className="block mt-3 mb-2 font-bold text-primary-dark">Start Time:</label>
            <input
                type="time"
                className="border p-2 rounded w-full text-black"
                value={form.startTime}
                onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            />

            <label className="block mt-3 mb-2 font-bold text-primary-dark">End Time:</label>
            <input
                type="time"
                className="border p-2 rounded w-full text-black"
                value={form.endTime}
                onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            />

            <button className="mt-4 bg-primary-purple text-white px-4 py-2 rounded">
                Save
            </button>
        </form>
    );
}
