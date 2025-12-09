import api from "@/lib/axios";

export async function getTemplatesByProfessional(profID) {
  const res = await api.get(`/consent_record/template/${profID}`);
  return res.data;
}

export const getConsentByPatient = async (patientID) => {
  const res = await api.get(`/consent_record?patientID=${patientID}`);
  return res.data?.data || res.data || [];
};

export const createConsent = async (payload) => {
  const res = await api.post(`/consent_record`, payload);
  return res.data || res.data.data || {};
};

export const updateConsent = async (id, payload) => {
  const res = await api.put(`/consent_record/${id}`, payload);
  return res.data || res.data.data || {};
};

export const getConsentById = async (id) => {
  const res = await api.get(`/consent_record/${id}`);
  return res.data || res.data.data || {};
};


export const deleteConsent = async (id) => {
  const res = await api.delete(`/consent_record/${id}`);
  return res.data || {};
};

export async function getConsentRecords(url = "/consent_records") {
  const res = await api.get(url);
  return res.data;
}

