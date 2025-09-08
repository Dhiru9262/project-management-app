import React from "react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const handleGoogleLogin = (role) => {
    window.location.href = `${"http://localhost:5000"}/api/auth/google/${role}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Welcome to project management App👋
        </h2>
        <p className="text-gray-500 mb-8">
          Login with Google as Student or Teacher
        </p>

        <button
          onClick={() => handleGoogleLogin("student")}
          className="w-full flex items-center justify-center gap-3 bg-gray-50 border border-gray-300 rounded-lg py-3 mb-4 hover:bg-gray-100 transition"
        >
          <FcGoogle size={24} />
          <span className="font-medium">Continue as Student</span>
        </button>

        <button
          onClick={() => handleGoogleLogin("teacher")}
          className="w-full flex items-center justify-center gap-3 bg-gray-50 border border-gray-300 rounded-lg py-3 hover:bg-gray-100 transition"
        >
          <FcGoogle size={24} />
          <span className="font-medium">Continue as Teacher</span>
        </button>

        <p className="mt-6 text-xs text-gray-400">
          By logging in, you agree to our{" "}
          <span className="underline cursor-pointer">Terms</span>.
        </p>
      </div>
    </div>
  );
}
