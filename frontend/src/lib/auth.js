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
 try {
    const res = await api.post("/login", { email, password });
  return res.data;
 }catch(err){
    console.log("LOGIN ERROR:", err.response.data);
    throw err;
 }
}

export async function register(userData) {
  try {
    const res = await api.post("/register", userData);
    return res.data;
  } catch (err) {
    console.log("REGISTER ERROR:", err.response.data);
    throw err;
  }
}


export async function me() {
  const res = await api.get("/me");
  return res.data;
}
