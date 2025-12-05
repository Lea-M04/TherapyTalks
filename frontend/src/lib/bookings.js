import api from "@/lib/axios";


export async function createBooking(data) {
  const res = await api.post("/booking", data);
  return res.data;
}


export async function getBookings(query = {}) {
  const params = new URLSearchParams(query).toString();
  const url = params ? `/booking?${params}` : "/booking";
  const res = await api.get(url);
  return res.data;
}


export async function getBookingById(id) {
  const res = await api.get(`/booking/${id}`);
  return res.data;
}


export async function deleteBooking(id) {
  const res = await api.delete(`/booking/${id}`);
  return res.data;
}

export async function getProfessionalBookings(professionalID, date) {
  const res = await api.get(`/bookings/professional/${professionalID}?date=${date}`);
  return res.data;
}
