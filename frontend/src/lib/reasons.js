import api from "@/lib/axios";

export async function getRejectReasons(page = 1) {
  const res = await api.get(`/reject_reasons?page=${page}`);
  return res.data;
}

export async function deleteRejectReason(id) {
  return api.delete(`/reject_reasons/${id}`);
}
