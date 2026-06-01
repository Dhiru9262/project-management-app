import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";
import {
  FiFolder,
  FiUsers,
  FiTool,
  FiBook,
  FiPlusCircle,
  FiArrowRight,
  FiClock,
  FiZap,
  FiCheckCircle,
} from "react-icons/fi";
import { API_BASE } from "../../config";

const StatCard = ({ icon: Icon, label, value, tint }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
    <span
      className={`h-11 w-11 rounded-xl flex items-center justify-center mb-3 ${tint}`}
    >
      <Icon size={20} />
    </span>
    <p className="text-2xl font-bold text-slate-800 leading-none">{value}</p>
    <p className="text-sm text-slate-500 mt-1.5">{label}</p>
  </div>
);

export default function OverviewPage() {
  const { user } = useOutletContext();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const isStudent = user.role === "student";

  useEffect(() => {
    const endpoint = isStudent ? "my-projects" : "teacher-projects";
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/api/projects/${endpoint}?email=${user.email}`,
          { withCredentials: true }
        );
        setProjects(res.data || []);
      } catch (err) {
        console.error("Error loading overview:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [user.email, isStudent]);

  const totalMembers = projects.reduce(
    (sum, p) => sum + (p.teamMembers?.length || 0),
    0
  );
  const totalTools = new Set(projects.flatMap((p) => p.toolsUsed || [])).size;
  const totalCourses = new Set(
    projects.map((p) => p.course?.code).filter(Boolean)
  ).size;

  const recent = [...projects]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 p-7 sm:p-9 text-white shadow-lg shadow-indigo-600/20">
        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10" />
        <div className="absolute right-16 bottom-0 h-28 w-28 rounded-full bg-white/10" />
        <div className="relative">
          <p className="text-indigo-200 text-sm mb-1">{today}</p>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Welcome back, {user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-indigo-100 mt-2 max-w-lg">
            {isStudent
              ? "Track your academic projects, manage your team, and submit new work — all in one place."
              : "Review and manage the projects your students have submitted to you."}
          </p>
          {isStudent && (
            <Link
              to="/dashboard/projects/new"
              className="inline-flex items-center gap-2 mt-5 bg-white text-indigo-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-50 transition shadow-sm"
            >
              <FiPlusCircle size={18} /> Create New Project
            </Link>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FiFolder}
          label={isStudent ? "My Projects" : "Assigned Projects"}
          value={loading ? "—" : projects.length}
          tint="bg-indigo-100 text-indigo-600"
        />
        <StatCard
          icon={FiUsers}
          label="Team Members"
          value={loading ? "—" : totalMembers}
          tint="bg-violet-100 text-violet-600"
        />
        <StatCard
          icon={FiTool}
          label="Tools Used"
          value={loading ? "—" : totalTools}
          tint="bg-emerald-100 text-emerald-600"
        />
        <StatCard
          icon={FiBook}
          label="Courses"
          value={loading ? "—" : totalCourses}
          tint="bg-amber-100 text-amber-600"
        />
      </div>

      {/* Two-column: Recent + Side panel */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent projects */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <FiClock className="text-slate-400" size={18} /> Recent Projects
            </h2>
            <Link
              to="/dashboard/projects"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              View all <FiArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center gap-3 text-slate-500 py-8">
              <span className="h-6 w-6 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
              Loading…
            </div>
          ) : recent.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
              <FiFolder className="mx-auto text-slate-300 mb-2" size={30} />
              <p className="text-slate-500 mb-3">No projects yet.</p>
              {isStudent && (
                <Link
                  to="/dashboard/projects/new"
                  className="inline-flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  <FiPlusCircle size={15} /> Create your first project
                </Link>
              )}
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {recent.map((proj) => (
                <li key={proj._id}>
                  <Link
                    to="/dashboard/projects"
                    className="flex items-center gap-4 py-3 group"
                  >
                    <span className="h-10 w-10 shrink-0 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      {(proj.title || "?")[0].toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition">
                        {proj.title}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {proj.course?.name || "—"} ·{" "}
                        {proj.teamMembers?.length || 0} members
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap hidden sm:block">
                      {proj.createdAt
                        ? new Date(proj.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                    <FiArrowRight
                      className="text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition"
                      size={16}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Side panel */}
        <div className="space-y-6">
          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
              <FiZap className="text-slate-400" size={18} /> Quick Actions
            </h2>
            <div className="space-y-2">
              <Link
                to="/dashboard/projects"
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition"
              >
                <span className="h-9 w-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <FiFolder size={16} />
                </span>
                <span className="text-sm font-medium text-slate-700">
                  {isStudent ? "View My Projects" : "Review Projects"}
                </span>
                <FiArrowRight className="ml-auto text-slate-300" size={16} />
              </Link>

              {isStudent && (
                <Link
                  to="/dashboard/projects/new"
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition"
                >
                  <span className="h-9 w-9 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center">
                    <FiPlusCircle size={16} />
                  </span>
                  <span className="text-sm font-medium text-slate-700">
                    Create New Project
                  </span>
                  <FiArrowRight className="ml-auto text-slate-300" size={16} />
                </Link>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-sm p-6 text-white">
            <h2 className="font-bold flex items-center gap-2 mb-3">
              <FiCheckCircle className="text-emerald-400" size={18} /> Tips
            </h2>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li className="flex gap-2">
                <span className="text-emerald-400">•</span>
                {isStudent
                  ? "Add all team members so your instructor sees the full team."
                  : "Click any project card to view its full details."}
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400">•</span>
                {isStudent
                  ? "List the tools you used, separated by commas."
                  : "Use the delete icon to remove outdated submissions."}
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-400">•</span>
                Keep your project title clear and descriptive.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
