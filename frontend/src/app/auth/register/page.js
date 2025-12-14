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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#f8f5f2] to-[#f0e9e4]">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
       
        <div className="md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-br from-primary via-primary-pink to-primary-purple text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
          </div>
          
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Begin Your Wellness Journey
            </h1>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4">
              
                <p className="text-lg leading-relaxed">
                  Join our supportive community for mental wellness
                </p>
              </div>
              
              <div className="flex items-start space-x-4">
               
                <p className="text-lg leading-relaxed">
                  Get personalized support on your unique journey
                </p>
              </div>
            </div>
          </div>
        </div>
       
        <div className="md:w-1/2 p-12 flex flex-col justify-center">
          <div className="mb-10 text-center">
           
            <h2 className="text-3xl font-bold text-primary-dark">Create Your Account</h2>
            <p className="text-primary-dark mt-2">Start your mental wellness journey today</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-3">
   
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">
                  First Name
                </label>
                <input 
                  name="firstName" 
                  onChange={handleChange} 
                  placeholder="First Name"
                  className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">
                  Last Name
                </label>
                <input 
                  name="lastName" 
                  onChange={handleChange} 
                  placeholder="Last Name"
                  className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">
                Username
              </label>
              <input 
                name="username" 
                onChange={handleChange} 
                placeholder="Username"
                className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
              />
            </div>
       
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">
                Email
              </label>
              <input 
                name="email" 
                onChange={handleChange} 
                placeholder="Email"
                className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
              />
            </div>
        
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-2">
                Password
              </label>
              <input 
                type="password" 
                name="password" 
                onChange={handleChange} 
                placeholder="Password"
                className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">
                  Phone Number
                </label>
                <input 
                  name="phoneNumber" 
                  onChange={handleChange} 
                  placeholder="Phone Number"
                  className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  onChange={handleChange}
                  className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
                />
              </div>
            </div>
    
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">
                  Gender
                </label>
                <select 
                  name="gender" 
                  onChange={handleChange}
                  className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary-dark mb-2">
                  Role
                </label>
                <select 
                  name="role" 
                  onChange={handleChange}
                  className="w-full p-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent transition-colors text-primary-dark"
                >
                  <option value="patient">Patient</option>
                  <option value="professional">Professional</option>
                </select>
              </div>
            </div>
          
            <button 
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-purple text-white font-medium rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink transition-all"
            >
              Register
            </button>
          </form>
          
          <div className="mt-10 text-center">
            <p className="text-primary-dark">
              Already have an account?{" "}
              <a href="/auth/login" className="font-medium text-primary-purple hover:text-primary-dark transition-colors">
                Sign in here
              </a>
            </p>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-sm text-primary-dark">
              By continuing, you agree to our{" "}
              <a href="#" className="text-primary-purple hover:text-primary-dark transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary-purple hover:text-primary-dark transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}