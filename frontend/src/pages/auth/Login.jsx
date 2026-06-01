import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FiCheckSquare, FiUser, FiBriefcase } from "react-icons/fi";
import { API_BASE } from "../../config";

export default function Login() {
  const handleGoogleLogin = (role) => {
    window.location.href = `${API_BASE}/api/auth/google/${role}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 sm:p-10 animate-fade-in">
        {/* Brand */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 mb-4">
            <FiCheckSquare className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Project Management
          </h1>
          <p className="text-slate-500 mt-2">
            Sign in to manage your academic projects
          </p>
        </div>

        {/* Role buttons */}
        <div className="space-y-3">
          <button
            onClick={() => handleGoogleLogin("student")}
            className="group w-full flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3.5 hover:border-indigo-400 hover:bg-indigo-50/50 transition shadow-sm"
          >
            <span className="h-9 w-9 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
              <FiUser size={18} />
            </span>
            <span className="font-semibold text-slate-700 flex-1 text-left">
              Continue as Student
            </span>
            <FcGoogle size={22} />
          </button>

          <button
            onClick={() => handleGoogleLogin("teacher")}
            className="group w-full flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3.5 hover:border-indigo-400 hover:bg-indigo-50/50 transition shadow-sm"
          >
            <span className="h-9 w-9 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600">
              <FiBriefcase size={18} />
            </span>
            <span className="font-semibold text-slate-700 flex-1 text-left">
              Continue as Teacher
            </span>
            <FcGoogle size={22} />
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          By logging in, you agree to our{" "}
          <span className="text-indigo-500 underline cursor-pointer">
            Terms
          </span>{" "}
          &amp; Privacy Policy.
        </p>
      </div>
    </div>
  );
}
