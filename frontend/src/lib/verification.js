import api from "./axios";


export async function getVerificationRequests() {
  const res = await api.get("/verification");
  return res.data?.data ?? [];
}


export async function getPendingRequests() {
  const res = await api.get("/verification/pending");
  return res.data?.data ?? [];
}

export async function getVerificationById(id) {
  const res = await api.get(`/verification/${id}`);
  return res.data?.data ?? null;
}


export async function approveRequest(id) {
  const res = await api.post(`/verification/${id}/approve`);
  return res.data ?? null;
}


export async function rejectRequest(id, data) {
  const res = await api.post(`/verification/${id}/reject`, data);
  return res.data ?? null;
}
