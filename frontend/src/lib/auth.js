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

export async function me() {
  const res = await api.get("/me");
  return res.data.user;
}
