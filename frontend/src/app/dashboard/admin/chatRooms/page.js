"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function ChatRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [pagination, setPagination] = useState({});

  const loadPage = (page) => {
    api
      .get(`/chat_rooms?page=${page}`)
      .then((res) => {
        setRooms(res.data.data);
        setPagination(res.data.meta);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    api
      .get("/chat_rooms")
      .then((res) => {
        setRooms(res.data.data);
        setPagination(res.data.meta);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl text-primary-dark font-bold mb-4">
        Chat Rooms
      </h1>

      <table className="w-full text-primary-dark border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Room ID</th>
            <th className="p-2 border">Professional</th>
            <th className="p-2 border">Patient</th>
            <th className="p-2 border">Created By</th>
            <th className="p-2 border">Created At</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room.chatRoomID}>
              <td className="p-2 border">{room.chatRoomID}</td>

              <td className="p-2 border">
                {room.professional
                  ? `${room.professional.user.firstName} ${room.professional.user.lastName}`
                  : "-"}
              </td>

              <td className="p-2 border">
                {room.patient
                  ? `${room.patient.user.firstName} ${room.patient.user.lastName}`
                  : "-"}
              </td>

              <td className="p-2 border">
                {room.createdByUser
                  ? `${room.createdByUser.firstName} ${room.createdByUser.lastName}`
                  : room.createdBy}
              </td>

              <td className="p-2 border">
                {new Date(room.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && (
        <div className="flex justify-center items-center gap-6 mt-4">
          <button
            disabled={pagination.current_page <= 1}
            onClick={() => loadPage(pagination.current_page - 1)}
            className="text-primary-dark font-bold text-lg disabled:opacity-50"
          >
            Prev
          </button>

          <button
            disabled={
              pagination.current_page >= pagination.last_page
            }
            onClick={() => loadPage(pagination.current_page + 1)}
            className="text-primary-dark font-bold text-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
