"use client";
import { useAuth } from "@/lib/context/AuthContext";
import { createChatRoom, getChatRooms } from "@/lib/chatRooms";
import { getTemplatesByProfessional, createConsent } from "@/lib/consent";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConsentPopup from "../consent/ConsentModal";

export default function StartChatButton({ professionalID, patientID }) {
  const { user } = useAuth();
  const router = useRouter();

  const finalPatientID = patientID || user?.patient?.patientID;

  const [template, setTemplate] = useState(null);
  const [showConsent, setShowConsent] = useState(false);
const toMySQLDate = (d) => {
  return new Date(d).toISOString().slice(0, 19).replace("T", " ");
};
  const startChat = async () => {
    const rooms = await getChatRooms();
    const existing = rooms.find(
      r => r.patientID === finalPatientID && r.professionalID === professionalID
    );

    if (existing) {
      router.push(`/chat/${existing.chatRoomID}`);
      return;
    }

  const templates = await getTemplatesByProfessional(professionalID);

const mainTemplate = templates.find(
  t => t.patientID === null && Number(t.professionalID) === Number(professionalID)
);

      if (!mainTemplate) {
    const room = await createChatRoom({
      createdBy: user.userID,
      professionalID,
      patientID: finalPatientID,
    });

    router.push(`/chat/${room.chatRoomID}`);
    return;
  }
    setTemplate(mainTemplate);
    setShowConsent(true);
  };

const handleAccept = async () => {
  const newConsent = await createConsent({
    professionalID,
    patientID: finalPatientID,
    consentType: template.consentType,  
    description: template.description,  
    signedAt: toMySQLDate(new Date()) , 
    accepted: 1,
    revoked: 0
  });

  const room = await createChatRoom({
    createdBy: user.userID,
    professionalID,
    patientID: finalPatientID,
  });

  router.push(`/chat/${room.chatRoomID}`);
};


  return (
    <>
      <button onClick={startChat} className="btn-primary">
        Start Chat
      </button>

      {showConsent && (
        <ConsentPopup
          text={template.description}
          onAccept={handleAccept}
          onClose={() => setShowConsent(false)}
        />
      )}
    </>
  );
}
