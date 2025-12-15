"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { updateUser, updateProfessional, getFullProfile ,getMyRejectReasons,  getMyVerificationRequests  } from "@/lib/auth";
import ProfessionalGuard from "@/components/guards/ProfessionalGuard";
import { useRouter } from "next/navigation";


export default function ProfessionalProfilePage() {
  const { user, setUser } = useAuth();
  const API_URL = process.env.NEXT_PUBLIC_URL;
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rejectReasons, setRejectReasons] = useState([]);
  const router = useRouter();
  


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
  getFullProfile().then(async (data) => {
    setUser({
      ...data.user,
      professionalID: data.professional.professionalID,
      professional: data.professional,
    });

    const reasons = await getMyRejectReasons();
    setRejectReasons(reasons || []);

    const reqs = await getMyVerificationRequests();
    const lastReq = reqs.length ? reqs[reqs.length - 1] : null;

    setUser(prev => ({
      ...prev,
      professional: {
        ...prev.professional,
        requestID: lastReq?.requestID ?? null
      }
    }));

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
        <div className="flex justify-center items-center py-10">
          <p className="text-primary-dark text-lg animate-pulse">
            Loading your profile...
          </p>
        </div>
      </ProfessionalGuard>
    );
  }

  return (
    <ProfessionalGuard>
      <div className="p-6 max-w-4xl mx-auto">

  
        <h1
          className="text-4xl font-extrabold mb-8 
          bg-gradient-to-r from-primary-pink to-primary-purple 
          bg-clip-text text-transparent tracking-wide"
        >
          My Professional Profile
        </h1>

    
        {user?.professional?.status === "pending" && (
          <div className="bg-yellow-100/80 border border-yellow-300 text-yellow-900 p-4 rounded-xl mb-6 shadow-md">
            <p className="font-semibold text-lg">⏳ Your account is pending verification.</p>
          </div>
        )}

        {user?.professional?.status === "rejected" && (
          <div className="bg-red-100/30 border border-red-300 text-red-800 p-5 rounded-xl mb-6 shadow-md">
            <p className="font-semibold text-lg">❌ Your verification was rejected</p>

            {rejectReasons.length > 0 ? (
              rejectReasons.map((r) => (
                <p key={r.reasonID} className="text-sm mt-1">
                  • {r.title}
                </p>
              ))
            ) : (
              <p>No rejection reasons provided.</p>
            )}

            <button
              onClick={() =>
                router.push(`/dashboard/professional/resubmit?id=${user?.professional?.requestID}`)
              }
              className="mt-4 bg-primary-purple text-white px-5 py-2 rounded-lg 
              hover:bg-primary-dark transition shadow"
            >
              Resubmit Verification
            </button>
          </div>
        )}

  
        {!editing ? (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-primary/30 space-y-4">


            <div className="flex items-center gap-4">
              <img
                src={`${API_URL}/uploads/profile_images/${user.profileImage}`}
                className="w-20 h-20 rounded-full object-cover border-4 border-primary-pink shadow"
              />
              <div>
                <p className="text-primary-dark font-bold text-3xl">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-primary-purple">@{user.username}</p>
              </div>
            </div>

        
            <h2 className="text-2xl font-semibold text-primary-dark mt-4">
              Basic Information
            </h2>

            <div className="grid grid-cols-2 gap-3 text-md text-primary-dark">
              <p><b className="text-primary-purple">Email:</b> {user.email}</p>
              <p><b className="text-primary-purple">Phone:</b> {user.phoneNumber}</p>
              <p><b className="text-primary-purple">Birth Date:</b> {user?.dateOfBirth?.split("T")[0]}</p>
              <p><b className="text-primary-purple">Gender:</b> {user.gender}</p>
            </div>

          
            <h2 className="text-2xl font-semibold text-primary-dark mt-4">
              Professional Details
            </h2>

            <div className="grid grid-cols-2 gap-3 text-md text-primary-dark">
              <p><b className="text-primary-purple">Specialization:</b> {user.professional?.specialization}</p>
              <p><b className="text-primary-purple">License #:</b> {user.professional?.licenseNumber}</p>
              <p><b className="text-primary-purple">Experience:</b> {user.professional?.experienceYears} years</p>
              <p><b className="text-primary-purple">Education:</b> {user.professional?.education}</p>
              <p><b className="text-primary-purple">Clinic:</b> {user.professional?.clinicName}</p>
              <p><b className="text-primary-purple">Street:</b> {user.professional?.clinicStreet}</p>
              <p><b className="text-primary-purple">City:</b> {user.professional?.clinicCity}</p>
            </div>

            <p className="mt-3 text-md text-primary-dark">
              <b className="text-primary-purple">Bio:</b> {user.professional?.bio}
            </p>

            <button
              onClick={() => setEditing(true)}
              className="mt-6 bg-primary-purple text-white px-6 py-2 rounded-lg 
              hover:bg-primary-dark transition w-full shadow"
            >
              Edit Profile
            </button>
          </div>
        ) : (
      
          <div className="bg-white p-6 rounded-xl shadow-lg border border-primary/30 space-y-6">
    
            <h2 className="text-xl font-semibold text-primary-dark">Edit Basic Info</h2>

            <div className="grid grid-cols-2 gap-4 text-primary-dark">
              {Object.keys(userForm).map((key) => {
                if (key === "dateOfBirth") {
                  return (
                    <input
                      key={key}
                      type="date"
                      value={userForm[key]}
                      onChange={(e) =>
                        setUserForm({ ...userForm, [key]: e.target.value })
                      }
                      className="border p-2 rounded-lg focus:ring-2 focus:ring-primary-pink"
                    />
                  );
                }

                if (key === "gender") {
                  return (
                    <select
                      key={key}
                      value={userForm[key]}
                      onChange={(e) =>
                        setUserForm({ ...userForm, gender: e.target.value })
                      }
                      className="border p-2 rounded-lg focus:ring-2 focus:ring-primary-pink"
                    >
                      <option value="">Select Gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  );
                }

                if (key === "profileImage") {
                  return (
                    <input
                      key={key}
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setUserForm({
                          ...userForm,
                          profileImage: e.target.files[0],
                        })
                      }
                      className="border p-2 rounded-lg bg-gray-50"
                    />
                  );
                }

                return (
                  <input
                    key={key}
                    placeholder={key}
                    value={userForm[key]}
                    onChange={(e) =>
                      setUserForm({ ...userForm, [key]: e.target.value })
                    }
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-primary-pink"
                  />
                );
              })}
            </div>

            <h2 className="text-xl font-semibold text-primary-dark">Professional Info</h2>

            <div className="grid grid-cols-2 gap-4 text-primary-dark">
              {Object.keys(profForm).map((key) =>
                key !== "bio" ? (
                  <input
                    key={key}
                    placeholder={key}
                    value={profForm[key]}
                    onChange={(e) =>
                      setProfForm({ ...profForm, [key]: e.target.value })
                    }
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-primary-pink"
                  />
                ) : (
                  <textarea
                    key={key}
                    placeholder="Bio"
                    value={profForm[key]}
                    onChange={(e) =>
                      setProfForm({ ...profForm, bio: e.target.value })
                    }
                    className="border p-2 rounded-lg col-span-2 h-24 focus:ring-2 focus:ring-primary-pink"
                  />
                )
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={save}
                className="bg-primary-purple text-white px-6 py-2 rounded-lg 
                hover:bg-primary-dark transition shadow-md"
              >
                {loading ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => setEditing(false)}
                className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition"
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