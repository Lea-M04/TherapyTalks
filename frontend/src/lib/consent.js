import api from "@/lib/axios";

export const getTemplatesByProfessional = async (professionalID) => {
  const res = await api.get(`/consent_record?professionalID=${professionalID}`);
  const data = res.data?.data || res.data || [];

  return data.filter(t => Number(t.professionalID) === Number(professionalID));
};

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
