import api from "@/lib/axios";

export async function getUserById(id) {
  const res = await api.get(`/users/${id}`);
  return res.data;
}

export async function getUsersAdmin(url = "/users") {
  const res = await api.get(url);
  return res.data;
}

export async function createUser(payload) {
  const res = await api.post("/users", payload);
  return res.data;
}

export async function updateUser(id, payload) {
  const res = await api.put(`/users/${id}`, payload);
  return res.data;
}

export async function deleteUser(id) {
  const res = await api.delete(`/users/${id}`);
  return res.data;
}