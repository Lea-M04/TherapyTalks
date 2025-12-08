"use client";
import { useEffect, useState } from "react";
import { getMyChatRooms } from "@/lib/chatRooms";
import Link from "next/link";

export default function ChatListPage() {
  const [rooms, setRooms] = useState([]);
const [search, setSearch] = useState("");

  useEffect(() => {
    getMyChatRooms().then(setRooms);
  }, []);

 const filtered = rooms.filter(r => r.otherUser).filter((r) => {
    const first = r.otherUser?.firstName?.toLowerCase() || "";
    const last = r.otherUser?.lastName?.toLowerCase() || "";
   
    const full = `${first} ${last}`;

    return (
      full.includes(search.toLowerCase())
    );
  });
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Chats</h1>
<input
        type="text"
        placeholder="Search chats..."
        className="border px-3 py-2 rounded w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.length === 0 && (
        <p className="text-gray-600">You have no chats yet.</p>
      )}

      <div className="space-y-4">
        {filtered.map((r) => (
          <Link
            key={r.chatRoomID}
            href={`/chat/${r.chatRoomID}`}
            className="block p-4 border rounded shadow hover:bg-gray-50"
          >
            <p className="font-medium">
              {r.otherUser?.firstName} {r.otherUser?.lastName}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
