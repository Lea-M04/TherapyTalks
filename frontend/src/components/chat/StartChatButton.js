"use client";
import { useAuth } from "@/lib/context/AuthContext";
import { createChatRoom, getChatRooms } from "@/lib/chatRooms";
import { useRouter } from "next/navigation";

export default function StartChatButton({ professionalID, patientID  }) {
  const { user } = useAuth();
  const router = useRouter();
const startChat = async () => {
  const finalPatientID = patientID || user?.patient?.patientID;

  const rooms = await getChatRooms();
  
  const existing = rooms.find(
    r => r.patientID === finalPatientID && r.professionalID === professionalID
  );

  if (existing) {
    router.push(`/chat/${existing.chatRoomID}`);
    return;
  }

  const room = await createChatRoom({
    createdBy: user.userID,
    professionalID,
     patientID: finalPatientID,
  });

  router.push(`/chat/${room.chatRoomID}`);
};


  return (
    <button onClick={startChat} className="btn-primary">
      Start Chat
    </button>
  );
}
