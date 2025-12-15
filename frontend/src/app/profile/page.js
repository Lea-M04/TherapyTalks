"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { updateUser, updatePatient , getFullProfile} from "@/lib/auth";
import PatientGuard from "@/components/guards/PatientGuard"; 
import NotificationSettings from "@/components/NotificationSettings";
import Modal from "@/components/ui/Modal";
import Link from "next/link";
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
    <div className="p-6 max-w-4xl mx-auto">

      <h1
        className="text-4xl font-extrabold mb-8
        bg-gradient-to-r from-primary-dark to-primary-purple
        bg-clip-text text-transparent tracking-wide"
      >
        My Patient Profile
      </h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setOpenNotifications(true)}
          className="bg-primary-dark text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 transition"
        >
          Notification Settings
        </button>

        <Link
          href="/my-diagnosis"
          className="bg-primary-purple text-white px-4 py-2 rounded-lg shadow hover:bg-primary-pink-hover transition"
        >
          View Diagnosis
        </Link>
      </div>

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
            <p><b className="text-primary-purple">Fist Name:</b> {user.firstName}</p>
            <p><b className="text-primary-purple">Last Name:</b> {user.lastName}</p>
            <p><b className="text-primary-purple">Username:</b> {user.username}</p>
            <p><b className="text-primary-purple">Email:</b> {user.email}</p>
            <p><b className="text-primary-purple">Phone:</b> {user.phoneNumber}</p>
            <p><b className="text-primary-purple">Gender:</b> {user.gender}</p>
          </div>

          <h2 className="text-2xl font-semibold text-primary-dark mt-4">
            Medical Details
          </h2>

          <div className="grid grid-cols-2 gap-3 text-md text-primary-dark">
            <p><b className="text-primary-purple">Medical History:</b> {patientForm.medicalHistory}</p>
            <p><b className="text-primary-purple">Allergies:</b> {patientForm.allergies}</p>
            <p><b className="text-primary-purple">Emergency Contact:</b> {patientForm.emergencyContactName}</p>
            <p><b className="text-primary-purple">Emergency Phone:</b> {patientForm.emergencyContactPhone}</p>
            <p><b className="text-primary-purple">Insurance #:</b> {patientForm.insuranceNumber}</p>
            <p><b className="text-primary-purple">Pseudonym:</b> {patientForm.pseudonym}</p>
          </div>

          <button
            onClick={() => setEditing(true)}
            className="mt-6 bg-primary-purple text-white px-6 py-2 rounded-lg
            hover:bg-primary-pink-hover transition w-full shadow"
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
                    onChange={(e) => setUserForm({ ...userForm, [key]: e.target.value })}
                    className="border p-2 rounded-lg focus:ring-2 focus:ring-primary-pink"
                  />
                );
              }
              if (key === "gender") {
                return (
                  <select
                    key={key}
                    value={userForm[key]}
                    onChange={(e) => setUserForm({ ...userForm, gender: e.target.value })}
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
                    onChange={(e) => setUserForm({ ...userForm, profileImage: e.target.files[0] })}
                    className="border p-2 rounded-lg bg-gray-50"
                  />
                );
              }
              return (
                <input
                  key={key}
                  placeholder={key}
                  value={userForm[key]}
                  onChange={(e) => setUserForm({ ...userForm, [key]: e.target.value })}
                  className="border p-2 rounded-lg focus:ring-2 focus:ring-primary-pink"
                />
              );
            })}
          </div>
          <h2 className="text-xl font-semibold text-primary-dark">Patient Information</h2>
          <div className="grid grid-cols-2 gap-4 text-primary-dark">
            {Object.keys(patientForm).map((key) =>
              key !== "medicalHistory" ? (
                <input
                  key={key}
                  placeholder={key}
                  value={patientForm[key]}
                  onChange={(e) =>
                    setPatientForm({ ...patientForm, [key]: e.target.value })
                  }
                  className="border p-2 rounded-lg focus:ring-2 focus:ring-primary-pink"
                />
              ) : (
                <textarea
                  key={key}
                  placeholder="Medical History"
                  value={patientForm[key]}
                  onChange={(e) =>
                    setPatientForm({ ...patientForm, medicalHistory: e.target.value })
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
              hover:bg-primary-pink-hover transition shadow-md"
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
      <Modal open={openNotifications} onClose={() => setOpenNotifications(false)}>
        <h2 className="text-xl font-bold text-primary-dark mb-4">Notification Settings</h2>
        <p className="mb-4 text-primary-dark">Customize how you want to get notifications</p>
        <NotificationSettings user={user} onSave={saveNotificationSettings} />
      </Modal>

    </div>
  </PatientGuard>
);
}