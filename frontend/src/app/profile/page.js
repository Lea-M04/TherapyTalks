"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { updateUser, updatePatient , getFullProfile} from "@/lib/auth";
import PatientGuard from "@/components/guards/PatientGuard"; 
import NotificationSettings from "@/components/NotificationSettings";
import Modal from "@/components/ui/Modal";
export default function PatientProfilePage() {
  const { user, setUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
const [openNotifications, setOpenNotifications] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_URL;
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

  const [patientForm, setPatientForm] = useState({
    medicalHistory: "",
    allergies: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    insuranceNumber: "",
    pseudonym: "",
  });
useEffect(() => {
  getFullProfile().then(data => {
   setUser({
      ...data.user,
      patientID: data.patient.patientID
    });
     setUserForm({
      firstName: data.user.firstName || "",
      lastName: data.user.lastName || "",
      email: data.user.email || "",
      phoneNumber: data.user.phoneNumber || "",
      dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split("T")[0] : "",
      gender: data.user.gender || "",
      username: data.user.username || "",
      profileImage: data.user.profileImage || "",
    });
    setPatientForm({
      medicalHistory: data.patient.medicalHistory || "",
      allergies: data.patient.allergies || "",
      emergencyContactName: data.patient.emergencyContactName || "",
      emergencyContactPhone: data.patient.emergencyContactPhone || "",
      insuranceNumber: data.patient.insuranceNumber || "",
      pseudonym: data.patient.pseudonym || "",
    });
  });
}, []);


  const save = async () => {
    setLoading(true);
    try {
      const updatedUser = await updateUser(user.userID, userForm);
      const updatedPatient = await updatePatient(user.patientID, patientForm);
      setUser((prev) => ({
        ...prev,
        ...updatedUser,
        patient: {
          ...prev.patient,
          ...updatedPatient,
        },
      }));

      window.location.reload();
      setEditing(false);

    } finally {
      setLoading(false);
    }
  };
const saveNotificationSettings = () => {
  alert("Saved");
  setOpenNotifications(false);
};

  if (!user) return <p className="text-white p-6">Loading...</p>;

  return (
    <PatientGuard>
    <div className="p-6">
      <h1 className="text-2xl text-white font-bold mb-4">My Patient Profile</h1>
 <button 
  onClick={() => setOpenNotifications(true)}
  className="bg-gray-700 text-white px-4 py-2 rounded"
>
  Notification Settings
</button>
<br></br>
<br></br>
      {!editing ? (
        <div className="bg-white p-4 rounded shadow text-black space-y-3">

          <h2 className="font-bold text-lg">Basic Info</h2>
          <img 
            src={`${API_URL}/uploads/profile_images/${user.profileImage}`} 
            className="w-16 h-16 rounded-full object-cover"/>
          <p><b>First Name:</b> {user.firstName}</p>
          <p><b>Last Name:</b> {user.lastName}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Phone:</b> {user.phoneNumber}</p>
          <p><b>Date of Birth:</b> {user.dateOfBirth?.split("T")[0]}</p>
          <p><b>Gender:</b> {user.gender}</p>
          <p><b>Username:</b> {user.username}</p>

          <h2 className="font-bold text-lg mt-4">Medical Info</h2>
          <p><b>Medical History:</b> {patientForm.medicalHistory}</p>
          <p><b>Allergies:</b> {patientForm.allergies}</p>
          <p><b>Emergency Contact:</b> {patientForm.emergencyContactName}</p>
          <p><b>Emergency Phone:</b> {patientForm.emergencyContactPhone}</p>
          <p><b>Insurance Number:</b> {patientForm.insuranceNumber}</p>
          <p><b>Pseudonym:</b> {patientForm.pseudonym}</p>

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
                        onChange={(e) =>
                        setUserForm({ ...userForm, [key]: e.target.value })
                        }
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
                        onChange={(e) =>
                        setUserForm({ ...userForm, gender: e.target.value })
                        }
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
                    onChange={(e) =>
                        setUserForm({ ...userForm, [key]: e.target.value })
                    }
                    className="border p-2 rounded"
                    />
                );
                })}

          </div>

          <h2 className="font-semibold mt-4">Patient Info</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(patientForm).map((key) =>
              key !== "medicalHistory" ? (
                <input
                  key={key}
                  name={key}
                  placeholder={key}
                  value={patientForm[key]}
                  onChange={(e) =>
                    setPatientForm({ ...patientForm, [key]: e.target.value })
                  }
                  className="border p-2 rounded"
                />
              ) : (
                <textarea
                  key={key}
                  placeholder="medicalHistory"
                  value={patientForm.medicalHistory}
                  onChange={(e) =>
                    setPatientForm({ ...patientForm, medicalHistory: e.target.value })
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
   
      <Modal open={openNotifications} onClose={() => setOpenNotifications(false)}>
        <h2 className="text-xl font-bold text-primary-dark mb-4">Notification Settings</h2>
        <p className="mb-4 text-primary-dark">Customize how you want to get notifications</p>
        <NotificationSettings user={user} onSave={saveNotificationSettings} />
        <div className="flex justify-end gap-3">
        </div>
      </Modal>
    </PatientGuard>
  );
}
