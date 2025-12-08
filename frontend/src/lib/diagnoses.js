import api from "./axios";

export const getDiagnosisByPatient = async (patientID) => {
  const res = await api.get(`/diagnosis/patient/${patientID}`);
  return res.data.data;
};

export const createDiagnosis = async (data) => {
  const res = await api.post("/diagnosis", data);
  return res.data;
};

export const updateDiagnosis = async (id, data) => {
  const res = await api.put(`/diagnosis/${id}`, data);
  return res.data;
};

export const getMyDiagnosis = async () => {
  const res = await api.get("/diagnosis");
  return res.data.data;
};
