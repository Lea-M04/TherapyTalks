import api from "@/lib/axios";

export const createChatRoom = async ({ createdBy, professionalID, patientID }) => {
  const res = await api.post("/chat_rooms", {
    createdBy,
    professionalID,
    patientID,
  });
  return res.data.data;
};

export const getChatRooms = async () => {
  const res = await api.get("/chat_rooms");
  return res.data.data;
};

export const getChatRoomById = async (id) => {
  const res = await api.get(`/chat_rooms/${id}`);
  return res.data;
};

export const deleteChatRoom = async (id) => {
  const res = await api.delete(`/chat_rooms/${id}`);
  return res.data;
};

export const getMyChatRooms = async () => {
  const res = await api.get("/chat_rooms/my");
  return res.data.data;
};
