import api from "@/lib/axios";

export async function getAvailabilityByProfessional(professionalID) {
    try {
        const res = await api.get(`/availability/${professionalID}`);
        return res.data.data;
    } catch (error) {
        console.error("Error getting availability:", error);
        throw error;
    }
}

export async function createAvailability(data) {
    try {
        const res = await api.post(`/availability`, data);
        return res.data;
    } catch (error) {
        console.error("Error creating availability:", error);
        throw error;
    }
}

export async function updateAvailability(id, data) {
    try {
        const res = await api.put(`/availability/${id}`, data);
        return res.data;
    } catch (error) {
        console.error("Error updating availability:", error);
        throw error;
    }
}

export async function deleteAvailability(id) {
    try {
        await api.delete(`/availability/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting availability:", error);
        throw error;
    }
}


export async function getAllAvailabilities(page = 1, perPage = 15) {
    try {
        const res = await api.get(`/availability?page=${page}&per_page=${perPage}`);
        return res.data;
    } catch (error) {
        console.error("Error getting all availabilities:", error);
        throw error;
    }
}
