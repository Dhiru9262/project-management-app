import React, { useState } from "react";
import axios from "axios";
import { FiPlus, FiX, FiFilePlus } from "react-icons/fi";
import { API_BASE } from "../config";

const EMPTY_FORM = {
  title: "",
  courseName: "",
  courseCode: "",
  instructorName: "",
  instructorEmail: "",
  problemStatement: "",
  objective: "",
  approach: "",
  toolsUsed: "",
  timeline: "",
  expectedOutcome: "",
};

// Shared input styling
const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";
const labelClass = "block text-sm font-medium text-slate-700 mb-1.5";

const CreateProject = ({ onProjectAdded }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [teamMembers, setTeamMembers] = useState([
    { name: "", email: "", role: "" },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", text }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTeamChange = (index, e) => {
    const updated = [...teamMembers];
    updated[index][e.target.name] = e.target.value;
    setTeamMembers(updated);
  };

  const addMember = () => {
    setTeamMembers([...teamMembers, { name: "", email: "", role: "" }]);
  };

  const removeMember = (index) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      const payload = {
        title: formData.title,
        teamMembers,
        course: {
          name: formData.courseName,
          code: formData.courseCode,
        },
        instructor: {
          name: formData.instructorName,
          email: formData.instructorEmail,
        },
        problemStatement: formData.problemStatement,
        objective: formData.objective,
        approach: formData.approach,
        toolsUsed: formData.toolsUsed.split(",").map((tool) => tool.trim()),
        timeline: formData.timeline,
        expectedOutcome: formData.expectedOutcome,
      };

      await axios.post(`${API_BASE}/api/projects`, payload, {
        withCredentials: true, // needed if your backend uses sessions/cookies
      });

      setStatus({ type: "success", text: "Project created successfully!" });
      setFormData(EMPTY_FORM);
      setTeamMembers([{ name: "", email: "", role: "" }]);
      onProjectAdded();
    } catch (err) {
      console.error("Error creating project:", err);
      setStatus({ type: "error", text: "Something went wrong. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header band */}
      <div className="flex items-center gap-3 px-6 py-5 bg-gradient-to-r from-indigo-600 to-violet-600">
        <span className="h-9 w-9 rounded-lg bg-white/20 flex items-center justify-center text-white">
          <FiFilePlus size={18} />
        </span>
        <div>
          <h2 className="text-lg font-bold text-white">Create New Project</h2>
          <p className="text-indigo-100 text-sm">
            Fill in the details to submit a project
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Project Title */}
        <div>
          <label className={labelClass}>Project Title *</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Smart Attendance System"
            className={inputClass}
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Team Members */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-slate-700">
              Team Members
            </label>
            <button
              type="button"
              onClick={addMember}
              className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              <FiPlus size={15} /> Add member
            </button>
          </div>

          <div className="space-y-2">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={inputClass}
                  value={member.name}
                  onChange={(e) => handleTeamChange(index, e)}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={inputClass}
                  value={member.email}
                  onChange={(e) => handleTeamChange(index, e)}
                  required
                />
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  className={inputClass}
                  value={member.role}
                  onChange={(e) => handleTeamChange(index, e)}
                />
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  disabled={teamMembers.length === 1}
                  title="Remove member"
                  className="h-9 w-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FiX size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Course + Instructor */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Course Name</label>
            <input
              type="text"
              name="courseName"
              className={inputClass}
              value={formData.courseName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>Course Code</label>
            <input
              type="text"
              name="courseCode"
              className={inputClass}
              value={formData.courseCode}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>Instructor Name</label>
            <input
              type="text"
              name="instructorName"
              className={inputClass}
              value={formData.instructorName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>Instructor Email</label>
            <input
              type="email"
              name="instructorEmail"
              className={inputClass}
              value={formData.instructorEmail}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Long-form fields */}
        <div className="grid gap-4">
          <div>
            <label className={labelClass}>Problem Statement</label>
            <textarea
              name="problemStatement"
              className={inputClass}
              rows="2"
              value={formData.problemStatement}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>Objective</label>
            <textarea
              name="objective"
              className={inputClass}
              rows="2"
              value={formData.objective}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className={labelClass}>Approach</label>
            <textarea
              name="approach"
              className={inputClass}
              rows="2"
              value={formData.approach}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Tools + Timeline */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tools Used</label>
            <input
              type="text"
              name="toolsUsed"
              placeholder="React, Node.js, MongoDB"
              className={inputClass}
              value={formData.toolsUsed}
              onChange={handleChange}
            />
            <p className="text-xs text-slate-400 mt-1">Separate with commas</p>
          </div>
          <div>
            <label className={labelClass}>Timeline</label>
            <input
              type="text"
              name="timeline"
              placeholder="e.g. 6 weeks"
              className={inputClass}
              value={formData.timeline}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Expected Outcome</label>
          <textarea
            name="expectedOutcome"
            className={inputClass}
            rows="2"
            value={formData.expectedOutcome}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition shadow-sm shadow-indigo-600/30 disabled:opacity-60"
          >
            {submitting && (
              <span className="h-4 w-4 rounded-full border-2 border-white/50 border-t-white animate-spin" />
            )}
            {submitting ? "Creating…" : "Create Project"}
          </button>

          {status && (
            <span
              className={`text-sm font-medium ${
                status.type === "success" ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {status.type === "success" ? "✅ " : "❌ "}
              {status.text}
            </span>
          )}
        </div>
      </form>
    </section>
  );
};

export default CreateProject;
