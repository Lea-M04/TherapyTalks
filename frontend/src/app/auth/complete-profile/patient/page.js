"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { me } from "@/lib/auth";

export default function CompletePatientProfile() {
  const router = useRouter();
  const [userID, setUserID] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
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
setIsLoading(true);
    try {
      await api.post("/patients", {
        ...form,
        userID,
      });

      router.push("/auth/login");
    } catch (err) {
      console.log("PATIENT ERROR:", err.response?.data);
    }
  };

  if (!userID) return <p>Loading...</p>;
return (
     <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#f8f5f2] to-[#f0e9e4]">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-primary/10 via-primary-pink/10 to-primary-purple/10">
        
          <h2 className="text-3xl font-bold text-primary-dark text-center">Complete Your Profile</h2>
          <p className="text-primary-dark mt-2 text-center mb-6">Help us understand your needs better</p>
        
          <form onSubmit={handleSubmit} className="space-y-3">
        
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">
                Medical History
              </label>
              <input 
                name="medicalHistory" 
                onChange={handleChange} 
                placeholder="Medical History (optional)"
                className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
              />
            </div>
         
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">
                Allergies
              </label>
              <input 
                name="allergies" 
                onChange={handleChange} 
                placeholder="Allergies (optional)"
                className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
              />
            </div>
         
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">
                  Emergency Contact Name
                </label>
                <input 
                  name="emergencyContactName" 
                  onChange={handleChange} 
                  placeholder="Name (optional)"
                  className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">
                  Emergency Contact Phone
                </label>
                <input 
                  name="emergencyContactPhone" 
                  onChange={handleChange} 
                  placeholder="Phone (optional)"
                  className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
                />
              </div>
            </div>
      
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">
                Insurance Number
              </label>
              <input 
                name="insuranceNumber" 
                onChange={handleChange} 
                placeholder="Insurance Number (optional)"
                className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
              />
            </div>
      
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">
                Preferred Pseudonym
                <span className="text-xs text-muted ml-2">(This is how you'll appear in sessions)</span>
              </label>
              <input 
                name="pseudonym" 
                onChange={handleChange} 
                placeholder="Choose a pseudonym (optional)"
                className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
              />
            </div>
    
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-purple text-white font-medium rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save Profile"
              )}
            </button>
           
          </form>
          
        </div>
      </div>
    </div>
  );
}
