import React, { useState } from "react";
import axios from "axios"; // Direct import

const CreateProject = () => {
  const [formData, setFormData] = useState({
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
  });

  const [teamMembers, setTeamMembers] = useState([
    { name: "", email: "", role: "" },
  ]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      // Direct axios call
      const res = await axios.post(
        "http://localhost:5000/api/projects",
        payload,
        { withCredentials: true } // needed if your backend uses sessions/cookies
      );

      alert("✅ Project created successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Error creating project:", err);
      alert("❌ Error creating project");
    }
  };

  return (
    <div
      style={{ backgroundColor: "#f8f2ed" }}
      className="max-w-4xl mx-auto p-8 rounded-2xl mt-10"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Project
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Project Title */}
        <div>
          <label className="block font-medium">Project Title</label>
          <input
            type="text"
            name="title"
            className="w-full border p-2 rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Team Members */}
        <div>
          <label className="block font-medium mb-2">Team Members</label>
          {teamMembers.map((member, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 mb-2">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="border p-2 rounded"
                value={member.name}
                onChange={(e) => handleTeamChange(index, e)}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border p-2 rounded"
                value={member.email}
                onChange={(e) => handleTeamChange(index, e)}
                required
              />
              <input
                type="text"
                name="role"
                placeholder="Role"
                className="border p-2 rounded"
                value={member.role}
                onChange={(e) => handleTeamChange(index, e)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addMember}
            className="text-blue-600 hover:underline text-sm"
          >
            + Add another member
          </button>
        </div>

        {/* Course Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Course Name</label>
            <input
              type="text"
              name="courseName"
              className="w-full border p-2 rounded"
              value={formData.courseName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium">Course Code</label>
            <input
              type="text"
              name="courseCode"
              className="w-full border p-2 rounded"
              value={formData.courseCode}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Instructor Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium">Instructor Name</label>
            <input
              type="text"
              name="instructorName"
              className="w-full border p-2 rounded"
              value={formData.instructorName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block font-medium">Instructor Email</label>
            <input
              type="email"
              name="instructorEmail"
              className="w-full border p-2 rounded"
              value={formData.instructorEmail}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Problem Statement */}
        <div>
          <label className="block font-medium">Problem Statement</label>
          <textarea
            name="problemStatement"
            className="w-full border p-2 rounded"
            rows="2"
            value={formData.problemStatement}
            onChange={handleChange}
          />
        </div>

        {/* Objective */}
        <div>
          <label className="block font-medium">Objective</label>
          <textarea
            name="objective"
            className="w-full border p-2 rounded"
            rows="2"
            value={formData.objective}
            onChange={handleChange}
          />
        </div>

        {/* Approach */}
        <div>
          <label className="block font-medium">Approach</label>
          <textarea
            name="approach"
            className="w-full border p-2 rounded"
            rows="2"
            value={formData.approach}
            onChange={handleChange}
          />
        </div>

        {/* Tools Used */}
        <div>
          <label className="block font-medium">
            Tools Used (comma-separated)
          </label>
          <input
            type="text"
            name="toolsUsed"
            className="w-full border p-2 rounded"
            value={formData.toolsUsed}
            onChange={handleChange}
          />
        </div>

        {/* Timeline */}
        <div>
          <label className="block font-medium">Timeline</label>
          <input
            type="text"
            name="timeline"
            className="w-full border p-2 rounded"
            value={formData.timeline}
            onChange={handleChange}
          />
        </div>

        {/* Expected Outcome */}
        <div>
          <label className="block font-medium">Expected Outcome</label>
          <textarea
            name="expectedOutcome"
            className="w-full border p-2 rounded"
            rows="2"
            value={formData.expectedOutcome}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
