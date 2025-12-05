import api from "./axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/professionals`;

export const createProfessional = async (data) => {
  const res = await api.post("/professionals", data);
  return res.data;
};

export const updateProfessional = async (id, data) => {
  const res = await api.put(`/professionals/${id}`, data);
  return res.data;
};

export const deleteProfessional = async (id) => {
  const res = await api.delete(`/professionals/${id}`);
  return res.data;
};

export async function getProfessionals() {
  const res = await fetch(`${BASE_URL}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch professionals");

  const json = await res.json();
  return json.data;
}

export async function getProfessionalById(id) {
  const res = await api.get(`/professionals/${id}`);
  if (res.status !== 200) {
    throw new Error("Failed to fetch professional");
  }
  return res.data.data;
}

export const getUsersWithoutProfessional = async () => {
  const res = await api.get("/admin/users/no-professional");
  return res.data;
};