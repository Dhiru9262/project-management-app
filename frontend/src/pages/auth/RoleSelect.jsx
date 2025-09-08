import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function RoleSelect() {
  const { user, setUser } = useAuth(); // user info from context
  const navigate = useNavigate();

  const handleRole = async (role) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/set-role",
        { role },
        {
          headers: { Authorization: `Bearer ${user.tempToken}` }, // temporary token without role
        }
      );

      // res.data = { email, name, role, token }
      setUser(res.data); // store full user with role + JWT
      localStorage.setItem("user", JSON.stringify(res.data));

      // Redirect based on role
      if (res.data.role === "student") navigate("/student/dashboard");
      else if (res.data.role === "teacher") navigate("/teacher/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-6">
      <h1 className="text-2xl font-bold text-gray-700">Select Your Role</h1>
      <div className="flex gap-4">
        <button
          onClick={() => handleRole("student")}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Student
        </button>
        <button
          onClick={() => handleRole("teacher")}
          className="px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          Teacher
        </button>
      </div>
    </div>
  );
}
