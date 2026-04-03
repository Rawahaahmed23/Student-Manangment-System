import React, { useState, useRef } from 'react';
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import Input from '../components/Input';
import { Spinner } from '@/components/ui/spinner';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const emailRef = useRef(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const email = emailRef.current.value;

    try {
      const response = await fetch('https://student-manangment-system.onrender.com/sendOtp', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
        setLoading(false);
        return;
      }

      navigate('/ResetPassword', { state: { email } });

    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Left Section - only on large screens */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">
        <img
          src="/Student.png"
          alt="Student"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:flex-1 bg-white flex items-center justify-center px-4 py-10 sm:px-8 lg:px-12 relative shadow-2xl">
        <div className="w-full max-w-md">

          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6 sm:mb-8"
          >
            <FaArrowLeft />
            Back to Login
          </button>

          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
              Forgot Password?
            </h1>
            <p className="text-base sm:text-lg text-gray-500">
              Enter your registered email. We'll send you an OTP to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

            {error && (
              <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="johndoe@example.com"
              ref={emailRef}
              icon={<FaEnvelope />}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 sm:mt-6 px-6 py-3 sm:py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold text-base sm:text-lg rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 transition-all"
            >
              {loading ? (
                <>
                  <Spinner className="h-5 w-5" />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}