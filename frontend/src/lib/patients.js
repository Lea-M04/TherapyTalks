import api from "./axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/patients`;

export const createPatient = async (data) => {
  const res = await api.post("/patients", data);
  return res.data;
};

export const updatePatient = async (id, data) => {
  const res = await api.put(`/patients/${id}`, data);
  return res.data;
};

export const deletePatient = async (id) => {
  const res = await api.delete(`/patients/${id}`);
  return res.data;
};

export async function getPatients(url = "/patients?page=1") {
  const res = await api.get(url);
  return res.data;
}

export async function getPatientsAll() {
  const res = await api.get("/patients/all");
  return res.data;
}



export async function getPatientById(id) {
  const res = await api.get(`/patients/${id}`);
  if (res.status !== 200) {
    throw new Error("Failed to fetch patient");
  }
  return res.data.data;
}

export const getUsersWithoutPatient = async () => {
  const res = await api.get("/admin/users/no-patient");
  return res.data;
};