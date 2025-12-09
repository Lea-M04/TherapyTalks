import api from "@/lib/axios";

export function setAuthToken(token) {
  if (!token) {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    return;
  }

  localStorage.setItem("token", token);
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export async function login(email, password) {
  const res = await api.post("/login", { email, password });

  return {
    access_token: res.data.access_token,
    user: res.data.user
  };
}

export async function register(data) {
  const res = await api.post("/register", data);
  return res.data;
}


export async function me() {
  const res = await api.get("/me");
  return res.data.user;
}

export async function getFullProfile() {
  const res = await api.get("/my-profile-data");
  return res.data;
}

export async function getPatientById(id) {
  const res = await api.get(`/patients/${id}`);
  return res.data;
}

export async function updatePatient(id, data) {
  const res = await api.put(`/patients/${id}`, data);
  return res.data;
}

export function updateProfessional(id, data) {
  return api.put(`/professionals/${id}`, data).then(res => res.data);
}
export async function updateUser(id, data) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (key === "profileImage") {
      if (data.profileImage instanceof File) {
        formData.append("profileImage", data.profileImage);
      }
    } else {
      formData.append(key, data[key]);
    }
  });

  const res = await api.post(`/users/${id}?_method=PUT`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}
