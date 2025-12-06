import api from "@/lib/axios";

export async function getUserById(id) {
  const res = await api.get(`/users/${id}`);
  return res.data;
}
