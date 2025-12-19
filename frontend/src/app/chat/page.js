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
  <div className="p-6 max-w-3xl mx-auto">

    <h1
      className="text-4xl font-extrabold mb-8
      bg-gradient-to-r from-primary-purple to-primary-pink
      bg-clip-text text-transparent tracking-wide"
    >
      Your Chats
    </h1>

    <input
      type="text"
      placeholder="Search chats..."
      className="border border-primary/80 px-4 py-3 rounded-xl w-full
      mb-6 shadow-sm focus:ring-2 focus:ring-primary-pink outline-none
      transition text-black"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    {filtered.length === 0 && (
      <p className="text-gray-600 bg-white p-6 rounded-xl shadow border border-gray-200 text-center">
        You have no chats yet.
      </p>
    )}

    <div className="space-y-4">
      {filtered.map((r) => (
        <Link
          key={r.chatRoomID}
          href={`/chat/${r.chatRoomID}`}
          className="block p-5 bg-white border border-primary/80 rounded-xl
          shadow hover:shadow-lg hover:border-primary-pink
          transition flex items-center justify-between"
        >
          <p className="font-semibold text-primary-dark text-lg">
          {r.otherUser.displayName
    ? r.otherUser.displayName
    : `${r.otherUser?.firstName ?? ""} ${r.otherUser?.lastName ?? ""}`
  }
          </p>

          <span className="text-xs bg-primary-pink text-white px-3 py-1 rounded-full shadow">
            Open
          </span>
        </Link>
      ))}
    </div>
  </div>
);
}
