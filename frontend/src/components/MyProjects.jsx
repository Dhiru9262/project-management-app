import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FiUser,
  FiBook,
  FiUsers,
  FiTrash2,
  FiFolder,
  FiPlus,
} from "react-icons/fi";
import ProjectDetails from "./ProjectDetails";
import { API_BASE } from "../config";

const MyProjects = ({ email, refresh }) => {
  const [projects, setProjects] = useState([]);
  const [openProject, setOpenProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Fetch projects
  useEffect(() => {
    if (!email) return;

    const fetchProjects = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `${API_BASE}/api/projects/my-projects?email=${email}`,
          { withCredentials: true }
        );
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Could not load your projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [email, refresh]);

  // Delete without a full refresh
  const handleDelete = async (_id, e) => {
    e.stopPropagation(); // prevent modal opening on delete click
    if (!window.confirm("Delete this project? This cannot be undone.")) return;

    setDeletingId(_id);
    try {
      await axios.delete(`${API_BASE}/api/projects/my-projects?_id=${_id}`, {
        withCredentials: true,
      });
      setProjects((prev) => prev.filter((proj) => proj._id !== _id));
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("❌ Could not delete the project.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="h-8 w-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
          <FiFolder size={16} />
        </span>
        <h2 className="text-lg font-bold text-slate-800">My Projects</h2>
        {!loading && !error && (
          <span className="ml-1 text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
            {projects.length}
          </span>
        )}
        <Link
          to="/dashboard/projects/new"
          className="ml-auto inline-flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition shadow-sm shadow-indigo-600/30"
        >
          <FiPlus size={15} /> New Project
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-slate-500 py-6">
          <span className="h-6 w-6 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
          Loading projects…
        </div>
      ) : error ? (
        <p className="text-rose-600 py-4">{error}</p>
      ) : projects.length === 0 ? (
        <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
          <FiFolder className="mx-auto text-slate-300 mb-2" size={32} />
          <p className="text-slate-500 mb-3">No projects yet.</p>
          <Link
            to="/dashboard/projects/new"
            className="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            <FiPlus size={15} /> Create your first project
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <article
              key={proj._id}
              className="group relative bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => setOpenProject(proj)}
            >
              <h3 className="font-bold text-slate-800 pr-8 mb-3 group-hover:text-indigo-600 transition">
                {proj.title}
              </h3>

              <div className="space-y-1.5 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <FiUser className="text-slate-400 shrink-0" size={14} />
                  {proj.instructor?.name || "—"}
                </p>
                <p className="flex items-center gap-2">
                  <FiBook className="text-slate-400 shrink-0" size={14} />
                  {proj.course?.name} ({proj.course?.code})
                </p>
                <p className="flex items-center gap-2">
                  <FiUsers className="text-slate-400 shrink-0" size={14} />
                  {proj.teamMembers.length} member
                  {proj.teamMembers.length !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                onClick={(e) => handleDelete(proj._id, e)}
                disabled={deletingId === proj._id}
                title="Delete project"
                className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition disabled:opacity-50"
              >
                {deletingId === proj._id ? (
                  <span className="h-4 w-4 rounded-full border-2 border-rose-300 border-t-rose-600 animate-spin" />
                ) : (
                  <FiTrash2 size={16} />
                )}
              </button>
            </article>
          ))}
        </div>
      )}

      {/* Popup Modal */}
      {openProject && (
        <ProjectDetails
          project={openProject}
          onClose={() => setOpenProject(null)}
        />
      )}
    </section>
  );
};

export default MyProjects;
