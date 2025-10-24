import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProjects = ({ email }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/projects/my-projects?email=${email}`,
          { withCredentials: true }
        );
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    if (email) fetchProjects();
  }, [email]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">My Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul className="space-y-4">
          {projects.map((proj) => (
            <li
              key={proj._id}
              className=" p-4 rounded shadow hover:shadow-lg transition"
              style={{ backgroundColor: "#f8f2ed" }}
            >
              <h3 className="font-bold text-lg">{proj.title}</h3>
              <p>
                <strong>Instructor:</strong> {proj.instructor?.name} (
                {proj.instructor?.email})
              </p>
              <p>
                <strong>Course:</strong> {proj.course?.name} (
                {proj.course?.code})
              </p>
              <p>
                <strong>TeamMembers :</strong>{" "}
                {proj.teamMembers.map((mem) => (
                  <span>{mem.email}, </span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyProjects;
