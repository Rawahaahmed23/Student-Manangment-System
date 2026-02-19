import React, { useState } from 'react';
import { useRef } from 'react';
import Input from '../components/Input';

export default function RegistrationForm() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (username && email && password) {
      alert(`Registered Successfully!\nUsername: ${username}`);
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left Section - Student Image */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent z-10"></div>
        <img 
          src="/Student.png" 
          alt="Student with books" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section - Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-8 lg:p-12 relative shadow-2xl">
        <div className="w-full max-w-md">
          {/* Logo/Icon */}
        
          

          {/* Title */}
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
            <a href="/login" className="text-sky-500 font-semibold hover:text-sky-600 transition-colors">
              Login here
            </a>
          </p>

          {/* Form */}
       
      <form
        onSubmit={handleSubmit}
        className=" rounded-2xl  w-full max-w-md space-y-6"
      >
 
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
          className="w-full py-3 bg-yellow-500 text-white font-bold rounded-xl hover:bg-yellow-600 transition"
        >
          Create Account
        </button>
      </form>


          {/* Footer Text */}
       
        </div>
      </div>
    </div>
  );
}