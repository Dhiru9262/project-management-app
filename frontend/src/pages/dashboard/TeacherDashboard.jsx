import React, { useEffect, useState } from "react";
import axios from "axios";

const TeacherDashboard = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const email = user.email;
  useEffect(() => {
    const fetchTeacherProjects = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/projects/teacher-projects?email=${email}`,
          { withCredentials: true }
        );
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching teacher projects:", err);
      }
    };

    if (email) fetchTeacherProjects();
  }, [email]);
  console.log(email);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Projects Assigned to You (Mr. {user.name})
      </h2>

      {projects.length === 0 ? (
        <p className="text-gray-600">No projects assigned yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="border rounded-2xl p-4 shadow hover:shadow-lg transition "
              style={{ backgroundColor: "#f8f2ed" }}
            >
              <h3 className="text-lg font-bold text-black-700 mb-2">
                {proj.title.toUpperCase()}
              </h3>
              <p className="text-gray-700 mb-1">
                <strong>Course:</strong> {proj.course?.name} (
                {proj.course?.code})
              </p>

              <p className="text-gray-700 mb-2">
                <strong>Tools:</strong> {proj.toolsUsed?.join(", ")}
              </p>
              <h4 className="font-semibold text-gray-800 mt-2">
                Team Members:
              </h4>
              <ul className="list-disc list-inside text-gray-600">
                {proj.teamMembers.map((member, idx) => (
                  <li key={idx}>
                    {member.name} ({member.email}) - {member.role}
                  </li>
                ))}
              </ul>

              <p className="text-gray-700 mb-1">
                <strong>Created Time :</strong>{" "}
                {new Date(proj.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
