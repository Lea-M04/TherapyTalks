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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#f8f5f2] to-[#f0e9e4]">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-primary/10 via-primary-pink/10 to-primary-purple/10">
        
          <h2 className="text-3xl font-bold text-primary-dark text-center">Complete Professional Profile</h2>
          <p className="text-primary-dark mt-2 text-center mb-6">Set up your professional information</p>
        
          <form onSubmit={handleSubmit} className="space-y-6">
         
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary-dark">Professional Information</h3>
              
              <input 
                name="specialization" 
                placeholder="Specialization" 
                onChange={handleChange}
                className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
              />
              
              <input 
                name="licenseNumber" 
                placeholder="License Number" 
                onChange={handleChange}
                className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
              />
              
              <input 
                name="experienceYears" 
                placeholder="Years of experience" 
                onChange={handleChange}
                className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
              />
              
              <input 
                name="education" 
                placeholder="Education" 
                onChange={handleChange}
                className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
              />
              
              <textarea 
                name="bio" 
                placeholder="Bio" 
                onChange={handleChange}
                className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
                rows="4"
              />
            </div>
            
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-xl font-semibold text-primary-dark">Clinic Info</h3>
              
              <input 
                name="clinicName" 
                placeholder="Clinic Name" 
                onChange={handleChange}
                className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  name="clinicStreet" 
                  placeholder="Street" 
                  onChange={handleChange}
                  className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
                />
                
                <input 
                  name="clinicCity" 
                  placeholder="City" 
                  onChange={handleChange}
                  className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
                />
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-xl font-semibold text-primary-dark">Document Type</h3>
              
              <select 
                onChange={(e) => setDocumentType(e.target.value)}
                className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
              >
                <option value="license">License</option>
                <option value="id_card">ID Card</option>
                <option value="certificate">Certificate</option>
              </select>

              <div>
                <h3 className="text-xl font-semibold text-primary-dark mb-4">Upload Document</h3>
                <input 
                  type="file" 
                  onChange={handleFileChange}
                  className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary-dark hover:file:bg-primary/20"
                />
              </div>
            </div>
          
            <button 
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-purple text-white font-medium rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink transition-all"
            >
              Submit
            </button>
           
          </form>
          
        </div>
      </div>
    </div>
  );
}