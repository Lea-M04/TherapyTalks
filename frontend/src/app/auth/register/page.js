"use client";
import { useState } from "react";
import { register as registerUser, setAuthToken } from "@/lib/auth";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
    const router=useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    role: "patient",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);

setAuthToken(res.token); 
localStorage.setItem("registeredUserID", res.user.id);

      if (form.role === "patient") {
        router.push("/auth/complete-profile/patient");
      } else {
        router.push("/auth/complete-profile/professional");
      }

    } catch (err) {
      console.log("Register failed:", err);
    }
  };

  return (
   <form onSubmit={handleSubmit}>
  <input name="firstName" onChange={handleChange} placeholder="First Name" />
  <input name="lastName" onChange={handleChange} placeholder="Last Name" />
  <input name="username" onChange={handleChange} placeholder="Username" />
  <input name="email" onChange={handleChange} placeholder="Email" />
  <input type="password" name="password" onChange={handleChange} placeholder="Password" />

  <input name="phoneNumber" onChange={handleChange} placeholder="Phone Number" />

  <input
    type="date"
    name="dateOfBirth"
    onChange={handleChange}
  />

  <select name="gender" onChange={handleChange}>
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>

  <select name="role" onChange={handleChange}>
    <option value="patient">Patient</option>
    <option value="professional">Professional</option>
  </select>

  <button type="submit">Register</button>
</form>

  );
}
