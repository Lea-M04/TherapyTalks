"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { me } from "@/lib/auth";

export default function CompletePatientProfile() {
  const router = useRouter();
  const [userID, setUserID] = useState(null);

  const [form, setForm] = useState({
    medicalHistory: "",
    allergies: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    insuranceNumber: "",
    pseudonym: "",
  });

  useEffect(() => {
    async function loadUser() {
      try {
         const data = await me();
        setUserID(data.userID);
      } catch (err) {
        console.log("ME ERROR:", err);
        router.push("/auth/login");
      }
    }
    loadUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/patients", {
        ...form,
        userID,
      });

      router.push("/");
    } catch (err) {
      console.log("PATIENT ERROR:", err.response?.data);
    }
  };

  if (!userID) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input name="medicalHistory" onChange={handleChange} placeholder="Medical History" />
      <input name="allergies" onChange={handleChange} placeholder="Allergies" />
      <input name="emergencyContactName" onChange={handleChange} placeholder="Emergency Contact Name" />
      <input name="emergencyContactPhone" onChange={handleChange} placeholder="Phone" />
      <input name="insuranceNumber" onChange={handleChange} placeholder="Insurance Number" />
      <input name="pseudonym" onChange={handleChange} placeholder="Pseudonym" />

      <button type="submit">Save</button>
    </form>
  );
}
