import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiBook, FiTool, FiUsers, FiClock, FiTrash2, FiInbox } from "react-icons/fi";
import ProjectDetails from "../../components/ProjectDetails";
import { API_BASE } from "../../config";

const TeacherDashboard = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [openProject, setOpenProject] = useState(null); // for popup
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const email = user.email;

  useEffect(() => {
    if (!email) return;

    const fetchTeacherProjects = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `${API_BASE}/api/projects/teacher-projects?email=${email}`,
          { withCredentials: true }
        );
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching teacher projects:", err);
        setError("Could not load assigned projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherProjects();
  }, [email]);

  // Delete without refreshing
  const handleDelete = async (_id, e) => {
    e.stopPropagation(); // prevents modal from opening when clicking delete
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
    <div>
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Assigned Projects
        </h2>
        <p className="text-slate-500 mt-1">
          Projects submitted to {user.name}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center gap-3 text-slate-500 py-6">
          <span className="h-6 w-6 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
          Loading projects…
        </div>
      ) : error ? (
        <p className="text-rose-600 py-4">{error}</p>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 bg-white border-2 border-dashed border-slate-200 rounded-2xl">
          <FiInbox className="mx-auto text-slate-300 mb-3" size={40} />
          <p className="text-slate-500">No projects assigned yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((proj) => (
            <article
              key={proj._id}
              className="group relative bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-5 shadow-sm hover:shadow-lg transition cursor-pointer"
              onClick={() => setOpenProject(proj)}
            >
              {/* Title + accent bar */}
              <div className="flex items-start gap-3 mb-4">
                <span className="mt-1 h-10 w-1.5 rounded-full bg-gradient-to-b from-indigo-500 to-violet-600 shrink-0" />
                <h3 className="text-base font-bold text-slate-800 leading-snug pr-8 group-hover:text-indigo-600 transition">
                  {proj.title}
                </h3>
              </div>

              <div className="space-y-2 text-sm text-slate-600">
                <p className="flex items-center gap-2">
                  <FiBook className="text-slate-400 shrink-0" size={15} />
                  {proj.course?.name} ({proj.course?.code})
                </p>
                <p className="flex items-start gap-2">
                  <FiTool className="text-slate-400 shrink-0 mt-0.5" size={15} />
                  <span className="flex flex-wrap gap-1.5">
                    {proj.toolsUsed?.length
                      ? proj.toolsUsed.map((tool, i) => (
                          <span
                            key={i}
                            className="bg-indigo-50 text-indigo-700 text-xs px-2 py-0.5 rounded-md"
                          >
                            {tool}
                          </span>
                        ))
                      : "—"}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <FiUsers className="text-slate-400 shrink-0" size={15} />
                  {proj.teamMembers.length} team member
                  {proj.teamMembers.length !== 1 ? "s" : ""}
                </p>
                <p className="flex items-center gap-2 text-slate-400 text-xs pt-1">
                  <FiClock className="shrink-0" size={14} />
                  {new Date(proj.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <button
                onClick={(e) => handleDelete(proj._id, e)}
                disabled={deletingId === proj._id}
                title="Delete project"
                className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition disabled:opacity-50"
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
    </div>
  );
};

export default TeacherDashboard;
