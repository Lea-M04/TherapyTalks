"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { updateUser, updateProfessional, getFullProfile } from "@/lib/auth";
import ProfessionalGuard from "@/components/guards/ProfessionalGuard";

export default function ProfessionalProfilePage() {
  const { user, setUser } = useAuth();
  const API_URL = process.env.NEXT_PUBLIC_URL;
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    username: "",
     profileImage: "",
  });

  
  const [profForm, setProfForm] = useState({
    specialization: "",
    licenseNumber: "",
    experienceYears: "",
    education: "",
    clinicName: "",
    clinicStreet: "",
    clinicCity: "",
    bio: "",
  });

  
useEffect(() => {
  getFullProfile().then(data => {
    setUser({
      ...data.user,
      professionalID: data.professional.professionalID,
      professional: data.professional,
    });

    setUserForm({
      firstName: data.user.firstName || "",
      lastName: data.user.lastName || "",
      email: data.user.email || "",
      phoneNumber: data.user.phoneNumber || "",
      dateOfBirth: data.user.dateOfBirth ? data.user.dateOfBirth.split("T")[0] : "",
      gender: data.user.gender || "",
      username: data.user.username || "",
      profileImage: data.user.profileImage || "",
    });

    setProfForm({
      specialization: data.professional.specialization || "",
      licenseNumber: data.professional.licenseNumber || "",
      experienceYears: data.professional.experienceYears || "",
      education: data.professional.education || "",
      clinicName: data.professional.clinicName || "",
      clinicStreet: data.professional.clinicStreet || "",
      clinicCity: data.professional.clinicCity || "",
      bio: data.professional.bio || "",
    });
  });
}, []);


  
  const save = async () => {
    setLoading(true);
    try {
      const updatedUser = await updateUser(user.userID, userForm);
      const updatedProf = await updateProfessional( user.professionalID, profForm);

      setUser((prev) => ({
        ...prev,
        ...updatedUser,
        professional: {
          ...prev.professional,
          ...updatedProf,
        },
      }));
         window.location.reload();
      setEditing(false);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <ProfessionalGuard>
        <p className="text-white p-6">Loading...</p>
      </ProfessionalGuard>
    );
  }

  return (
    <ProfessionalGuard>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-4">
          My Professional Profile
        </h1>

        {!editing ? (
          <div className="bg-white p-4 rounded shadow text-black space-y-3">
       
            <h2 className="font-bold text-lg">Basic Info</h2>
             <img 
  src={`${API_URL}/uploads/profile_images/${user.profileImage}`} 
  className="w-16 h-16 rounded-full object-cover"
/>
            <p><b>First Name:</b> {user.firstName}</p>
            <p><b>Last Name:</b> {user.lastName}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Phone:</b> {user.phoneNumber}</p>
            <p><b>Date of Birth:</b> {user?.dateOfBirth ? user.dateOfBirth.split("T")[0] : ""}</p>
            <p><b>Gender:</b> {user.gender}</p>
            <p><b>Username:</b> {user.username}</p>

            <h2 className="font-bold text-lg mt-4">Professional Info</h2>
            <p><b>Specialization:</b> {user.professional?.specialization}</p>
            <p><b>License #:</b> {user.professional?.licenseNumber}</p>
            <p><b>Experience:</b> {user.professional?.experienceYears} years</p>
            <p><b>Education:</b> {user.professional?.education}</p>
            <p><b>Clinic Name:</b> {user.professional?.clinicName}</p>
            <p><b>Clinic Street:</b> {user.professional?.clinicStreet}</p>
            <p><b>Clinic City:</b> {user.professional?.clinicCity}</p>
            <p><b>Bio:</b> {user.professional?.bio}</p>

            <button
              onClick={() => setEditing(true)}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded"
            >
              Edit Profile
            </button>
          </div>
        ) : (

          <div className="bg-white p-4 rounded shadow text-black space-y-6">
            <h2 className="font-semibold">Basic Info</h2>
            <div className="grid grid-cols-2 gap-4">
           {Object.keys(userForm).map((key) => {
          if (key === "dateOfBirth") {
            return (
              <input
                key={key}
                type="date"
                name={key}
                value={userForm[key]}
                onChange={(e) => setUserForm({ ...userForm, [key]: e.target.value })}
                className="border p-2 rounded"
              />
            );
          }

          if (key === "gender") {
            return (
              <select
                key={key}
                name={key}
                value={userForm[key]}
                onChange={(e) => setUserForm({ ...userForm, gender: e.target.value })}
                className="border p-2 rounded"
              >
                <option value="">Select gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            );
          }   
            if(key==="profileImage"){
                    return(
                    <input
                    key={key}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setUserForm({ ...userForm, profileImage: e.target.files[0] })}
                    />)

                }

          return (
            <input
              key={key}
              name={key}
              placeholder={key}
              value={userForm[key]}
              onChange={(e) => setUserForm({ ...userForm, [key]: e.target.value })}
              className="border p-2 rounded"
            />
          );
        })}
            </div>
            <h2 className="font-semibold mt-4">Professional Info</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(profForm).map((key) =>
                key !== "bio" ? (
                  <input
                    key={key}
                    name={key}
                    placeholder={key}
                    value={profForm[key]}
                    onChange={(e) =>
                      setProfForm({ ...profForm, [key]: e.target.value })
                    }
                    className="border p-2 rounded"
                  />
                ) : (
                  <textarea
                    key={key}
                    name={key}
                    placeholder="bio"
                    value={profForm.bio}
                    onChange={(e) =>
                      setProfForm({ ...profForm, bio: e.target.value })
                    }
                    className="border p-2 rounded col-span-2"
                  />
                )
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={save}
                className="bg-blue-600 text-white px-6 py-2 rounded"
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => setEditing(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </ProfessionalGuard>
  );
}
