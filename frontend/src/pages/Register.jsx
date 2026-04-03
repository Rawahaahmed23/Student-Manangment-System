import React, { useState, useRef } from 'react';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import { Spinner } from "@/components/ui/spinner"
import { toast } from 'react-toastify';


export default function RegistrationForm() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
const Navigate = useNavigate()
  const [loading ,setloading] = useState(false)

const [error, setError] = useState("");
  

const handleSubmit = async (e) => {
  e.preventDefault();


  if (loading) return;

  const formData = {
    username: usernameRef.current.value,
    email: emailRef.current.value,
    password: passwordRef.current.value
  };

  setloading(true);

  try {
    const response = await fetch('https://student-manangment-system.onrender.com/signup', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

   if (response.ok) {
  setloading(false);
  toast.success("Registration successful!");
  Navigate('/');
} else {

  console.log("Error response:", data);
  
  const errorMsg = data.message || data.extraDetails || data.error || "Signup failed. Please try again.";
  toast.error(errorMsg);
  setloading(false); // move this here too
}

  } catch (error) {
    
    console.log(error);
    toast.error("Network error. Please try again.");

  } finally {
    setloading(false); 
  }
};

  return (
    <div className="flex min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
     
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent z-10"></div>
        <img 
          src="/Student.png" 
          alt="Student with books" 
          className="w-full h-full object-cover"
        />
      </div>

   
      <div className="flex-1 bg-white flex items-center justify-center p-8 lg:p-12 relative shadow-2xl">
        <div className="w-full max-w-md">
  
        
          

       
          <div className="mb-10">
           <h1 className="text-4xl lg:text-5xl font-bold text-gray-800  mb-3">
Sign up
</h1>

            <p className="text-lg text-gray-500">
              Create your account to get started
            </p>
          </div>
          
          <p className="text-sm text-gray-600 mb-8">
            Already have an account?{' '}
            <a href="/" className="text-sky-500 font-semibold hover:text-sky-600 transition-colors">
              Login here
            </a>
          </p>

          {/* Form */}
       
      <form
        onSubmit={handleSubmit}
        className=" rounded-2xl  w-full max-w-md space-y-6"
      >
        {error && (
  <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm">
    {error}
  </div>
)}
 
        <Input
          ref={usernameRef}
          label="Username"
          type="text"
          name="username"
          placeholder="johndoe"
        />

        <Input
          ref={emailRef}
          label="Email"
          type="email"
          name="email"
          placeholder="john@example.com"
        />

        <Input
          ref={passwordRef}
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
        />

     <button
  type="submit"
  disabled={loading}
  className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
>
  {loading ? (
    <>
      <Spinner className="h-5 w-5 animate-spin" />
      Creating Account...
    </>
  ) : (
    "Create Account"
  )}
</button>
      </form>

         

        
       
        </div>
      </div>
    </div>
  );
}