import api from "@/lib/axios";

export const getMessages = async (chatRoomID) => {
  const res = await api.get(`/chat_rooms/${chatRoomID}/messages`);
  return res.data.data;
};

export const sendMessage = async (chatRoomID, { content, receiverID }) => {
  const res = await api.post(`/chat_rooms/${chatRoomID}/messages`, {
    content,
    receiverID,
    chatRoomID,
  });
  return res.data.data;
};
