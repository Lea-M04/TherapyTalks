import api from "@/lib/axios";

export async function getNotifications(page = 1, perPage = 50) {
  const res = await api.get(`/notifications?page=${page}&per_page=${perPage}`);
  return res.data;
}

export async function markNotificationRead(id) {
  const res = await api.patch(`/notifications/${id}/read`);
  return res.data;
}

export async function deleteNotification(id) {
  const res = await api.delete(`/notifications/${id}`);
  return res.data;
}

