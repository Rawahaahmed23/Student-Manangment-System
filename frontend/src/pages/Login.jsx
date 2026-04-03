import React, { useState, useRef } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import Input from '../components/Input';
import { useAuth } from '@/Store/useAuth';
import { Spinner } from '@/components/ui/spinner';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const navigate = useNavigate();

  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { userAuthentication } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch('https://student-manangment-system.onrender.com/Login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ 
          username, 
          password,
          rememberMe   
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.extraDetails || data.message);
        setLoading(false);
        return;
      }
      await userAuthentication(); 
      setLoading(false);
      navigate("/Dashboard");

    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">

      {/* Left Section */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">
        <img 
          src="/Student.png" 
          alt="Student with books" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 bg-white flex items-center justify-center p-8 lg:p-12 relative shadow-2xl">
        <div className="w-full max-w-md">

          <div className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Login
            </h1>
            <p className="text-lg text-gray-500">
              Login to your account
            </p>
          </div>

          <p className="text-sm text-gray-600 mb-8">
            Don't have an account?{" "}
            <a 
              href="/register" 
              className="text-sky-500 font-semibold hover:text-sky-600 transition-colors"
            >
              Register here
            </a>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {error && (
              <div className="bg-red-100 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-sky-500 border-gray-300 rounded focus:ring-sky-500"
                />
                Remember Me
              </label>

              {/* ── Forgot Password Link ── */}
              <a
                href="/forgot-password"
                className="text-sm text-sky-500 font-semibold hover:text-sky-600 transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              disabled={Loading}
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {Loading ? (
                <>
                  <Spinner className="h-5 w-5" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}