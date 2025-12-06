import api from "@/lib/axios";

export async function getNotificationSettings(userID) {
  const res = await api.get(`/notification_settings/${userID}`);
  return res.data;
}

export async function createNotificationSettings(data) {
  const res = await api.post(`/notification_settings`, data);
  return res.data;
}

export async function updateNotificationSettings(id, data) {
  const res = await api.put(`/notification_settings/${id}`, data);
  return res.data;
}
