"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef  } from "react";
import { getMessages, sendMessage } from "@/lib/messages";
import { getChatRoomById } from "@/lib/chatRooms";
import { useAuth } from "@/lib/context/AuthContext";
import Pusher from "pusher-js";

export default function ChatRoom() {
  const { id } = useParams();
  const chatRoomID = id;

  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [chatRoom, setChatRoom] = useState(null);
  const [text, setText] = useState("");
const bottomRef = useRef(null);
  useEffect(() => {
    loadChatRoom();
    loadMessages();
    subscribeRealtime();
  }, []);
    useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadChatRoom = async () => {
    const room = await getChatRoomById(chatRoomID);
    setChatRoom(room.data);
  };

  const loadMessages = async () => {
    const data = await getMessages(chatRoomID);
    setMessages(data);
  };

  const subscribeRealtime = () => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusher.subscribe(`chat-room.${chatRoomID}`);
    channel.bind("message.sent", (message) => {
  setMessages(prev => {
    if (prev.some(m => m.messageID === message.messageID)) {
      return prev;
    }
    return [...prev, message];
  });
});

  };

  const handleSend = async () => {
    if (!chatRoom) return;
    if (!text.trim()) return;
 const old = text;
  setText("");
    const receiverID =
  user.userID === chatRoom.patientUserID
    ? chatRoom.professionalUserID
    : chatRoom.patientUserID;

console.log(chatRoom);

   try {
    await sendMessage(chatRoomID, {
      content: old,
      receiverID:
        user.userID === chatRoom.patientUserID
          ? chatRoom.professionalUserID
          : chatRoom.patientUserID,
      chatRoomID,
    });

  } catch (err) {
    console.error(err);
  }
};

if (!user) return <div>Loading...</div>;
if (!chatRoom) {
  return (
    <div className="flex justify-center items-center h-screen">
      Loading chat room...
    </div>
  );
}
    return (
    <div className="flex flex-col h-screen w-[80%] justify-self-center bg-gray-100">
      <div className="p-4 bg-white shadow flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
          {chatRoom.otherUser.displayName[0]}
        </div>

        <div>
          <h2 className="text-lg font-semibold capitalize">
            {chatRoom.otherUser.displayName}
          </h2>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <div
            key={m.messageID}
            className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
              m.senderID === user.userID
                ? "bg-primary-dark text-white self-end ml-auto"
                : "bg-white border text-gray-800"
            }`}
          >
            {m.content}
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>
      <div className="p-4 bg-white flex items-center gap-3 border-t">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Write a message..."
          className="flex-1 px-4 py-2 border rounded-full bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleSend}
          className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}