import React, { useState } from 'react';
import { useRef } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import Input from '../components/Input';

export default function LoginForm() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username && password) {
      alert(`Login successful!\n\nUsername: ${username}`);
      console.log({ username, password });
    } else {
      alert("Please fill in all required fields.");
    }
  };


  return (
    <div className="flex min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left Section - Student Image */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">

        <img 
          src="/Student.png" 
          alt="Student with books" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section - Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-8 lg:p-12 relative shadow-2xl">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3"> Login </h1>
            <p className="text-lg text-gray-500">
              Login to your account</p>
          </div>
          
          <p className="text-sm text-gray-600 mb-8">
            Don't have an account?{' '}
            <a href="/register" className="text-sky-500 font-semibold hover:text-sky-600 transition-colors">
              Register here
            </a>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

      <Input
        label="Username"
        type="text"
        name="username"
        placeholder="johndoe"
        ref={usernameRef}
        icon={<FaUser />}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        placeholder="••••••••"
        ref={passwordRef}
        icon={<FaLock />}
      />

      <button
        type="submit"
        className="w-full mt-8 px-6 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold text-lg rounded-xl"
      >
        Login
      </button>

    </form>
        </div>
      </div>
    </div>
  );
}