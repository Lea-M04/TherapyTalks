"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { me } from "@/lib/auth";

export default function CompleteProfessionalProfile() {
  const router = useRouter();
  const [userID, setUserID] = useState(null);

  const [form, setForm] = useState({
    specialization: "",
    licenseNumber: "",
    experienceYears: "",
    education: "",
    bio: "",
    clinicName: "",
    clinicStreet: "",
    clinicCity: "",
  });

  const [document, setDocument] = useState(null);
  const [documentType, setDocumentType] = useState("license"); 

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

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let professionalID = null;

    try {
      const res = await api.post("/professionals", { ...form, userID });
      professionalID = res.data.data.professionalID;
    } catch (err) {
      console.log("422 ERROR (PROF):", err.response?.data);
      return;
    }


    const fileData = new FormData();
    fileData.append("professionalID", professionalID);
    fileData.append("documentType", documentType); 
    fileData.append("document", document);

    try {
      await api.post("/verification/submit", fileData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      router.push("/dashboard/professional");
    } catch (err) {
      console.log("VERIFY ERROR:", err.response?.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="specialization" placeholder="Specialization" onChange={handleChange}/>
      <input name="licenseNumber" placeholder="License Number" onChange={handleChange}/>
      <input name="experienceYears" placeholder="Years of experience" onChange={handleChange}/>
      <input name="education" placeholder="Education" onChange={handleChange}/>
      <textarea name="bio" placeholder="Bio" onChange={handleChange}/>

      <h3>Clinic Info</h3>
      <input name="clinicName" placeholder="Clinic Name" onChange={handleChange}/>
      <input name="clinicStreet" placeholder="Street" onChange={handleChange}/>
      <input name="clinicCity" placeholder="City" onChange={handleChange}/>

      <h3>Document Type</h3>
      <select onChange={(e) => setDocumentType(e.target.value)}>
        <option value="license">License</option>
        <option value="id_card">ID Card</option>
        <option value="certificate">Certificate</option>
      </select>

      <h3>Upload Document</h3>
      <input type="file" onChange={handleFileChange}/>

      <button type="submit">Submit</button>
    </form>
  );
}
