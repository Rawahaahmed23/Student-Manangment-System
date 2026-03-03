import React, { useState, useRef } from 'react';
import { FaLock, FaArrowLeft } from "react-icons/fa";
import Input from '../components/Input';
import { Spinner } from '@/components/ui/spinner';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  if (!email) {
    return <Navigate to="/404" replace />;
  }

  const [step, setStep] = useState("otp");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const verifiedOtp = useRef(""); 

  const newPasswordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ── OTP handlers ──────────────────────────────────────────
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const updated = [...otp];
    pasted.split("").forEach((char, i) => { updated[i] = char; });
    setOtp(updated);
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  // ── OTP Verify ────────────────────────────────────────────
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");

    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/verify-otp', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid OTP or OTP expired.");
        setLoading(false);
        return;
      }

      // OTP sahi — password step pe jao
      verifiedOtp.current = otpCode;
      setStep("password");

    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/resetPassword', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: verifiedOtp.current, newpassword: newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong.");
        setLoading(false);
        return;
      }

      setSuccess("Password reset successfully! Redirecting to login...");
      setTimeout(() => navigate('/'), 2000);

    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">

  
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">
        <img src="/Student.png" alt="Student" className="w-full h-full object-cover" />
      </div>

 
      <div className="w-full lg:flex-1 bg-white flex items-center justify-center px-4 py-10 sm:px-8 lg:px-12 relative shadow-2xl">
        <div className="w-full max-w-md">

 
          <button
            onClick={() => {
              if (step === "password") {
                setStep("otp");
                setError("");
              } else {
                navigate('/forgot-password');
              }
            }}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6 sm:mb-8"
          >
            <FaArrowLeft />
            Back
          </button>

      
          {step === "otp" && (
            <>
              <div className="mb-8 sm:mb-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Verify OTP
                </h1>
                <p className="text-base sm:text-lg text-gray-500 break-words">
                  OTP sent to{" "}
                  <span className="font-semibold text-sky-500">{email}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-5 sm:space-y-6">

                {error && (
                  <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Enter OTP
                  </label>
                  <div className="grid grid-cols-6 gap-2 sm:gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (otpRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-full aspect-square text-center text-lg sm:text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-sky-500 focus:outline-none transition-colors"
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 sm:mt-6 px-6 py-3 sm:py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold text-base sm:text-lg rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 transition-all"
                >
                  {loading ? (
                    <>
                      <Spinner className="h-5 w-5" />
                      Verifying...
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </button>

              </form>
            </>
          )}

         
          {step === "password" && (
            <>
              <div className="mb-8 sm:mb-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Reset Password
                </h1>
                <p className="text-base sm:text-lg text-gray-500">
                  Enter your new password below.
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-5 sm:space-y-6">

                {error && (
                  <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-sm">
                    {success}
                  </div>
                )}

                <Input
                  label="New Password"
                  type="password"
                  name="newPassword"
                  placeholder="••••••••"
                  ref={newPasswordRef}
                  icon={<FaLock />}
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  ref={confirmPasswordRef}
                  icon={<FaLock />}
                />

                <button
                  type="submit"
                  disabled={loading || !!success}
                  className="w-full mt-4 sm:mt-6 px-6 py-3 sm:py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold text-base sm:text-lg rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 transition-all"
                >
                  {loading ? (
                    <>
                      <Spinner className="h-5 w-5" />
                      Resetting...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>

              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}