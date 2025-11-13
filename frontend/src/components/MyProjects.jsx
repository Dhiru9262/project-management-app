import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectDetails from "./ProjectDetails";

const MyProjects = ({ email, refresh }) => {
  const [projects, setProjects] = useState([]);
  const [openProject, setOpenProject] = useState(null);

  // Fetch projects
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

  useEffect(() => {
    if (email) fetchProjects();
  }, [email, refresh]);

  // Handle delete without refreshing
  const handleDelete = async (_id, e) => {
    e.stopPropagation(); // prevent modal opening on delete click
    try {
      await axios.delete(
        `http://localhost:5000/api/projects/my-projects?_id=${_id}`,
        { withCredentials: true }
      );

      // Remove deleted project from state
      setProjects((prev) => prev.filter((proj) => proj._id !== _id));
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

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
              className="p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
              style={{ backgroundColor: "#f8f2ed" }}
              onClick={() => setOpenProject(proj)} // open modal
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
                <strong>Team Members:</strong>{" "}
                {proj.teamMembers.map((mem, idx) => (
                  <span key={idx}>
                    {mem.email}
                    {idx < proj.teamMembers.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <button
                onClick={(e) => handleDelete(proj._id, e)}
                className="px-3 py-1 rounded text-white mt-2"
                style={{ backgroundColor: "red" }}
              >
                Delete
              </button>
            </li>
          ))}

          {/* ✅ Popup Modal */}
          {openProject && (
            <ProjectDetails
              project={openProject}
              onClose={() => setOpenProject(null)}
            />
          )}
        </ul>
      )}
    </div>
  );
};

export default MyProjects;
