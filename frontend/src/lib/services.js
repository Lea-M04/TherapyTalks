import api from "@/lib/axios";

export async function getServicesByProfessional(professionalID) {
  try {
    const res = await api.get(`/professionals/${professionalID}/services`);
    return res.data.data ?? res.data;
  } catch (error) {
    console.error("Error getting services:", error);
    throw error;
  }
}

export async function getAllServices() {
  try {
    const res = await api.get(`/services`);
    return res.data.data ?? res.data;
  } catch (error) {
    console.error("Error getting all services:", error);
    throw error;
  }
}

export async function createService(data) {
  try {
    const res = await api.post(`/services`, data);
    return res.data;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
}

export async function updateService(id, data) {
  try {
    const res = await api.put(`/services/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
}

export async function deleteService(id) {
  try {
    await api.delete(`/services/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
}
