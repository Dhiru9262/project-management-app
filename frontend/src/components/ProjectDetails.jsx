import React from "react";
import { FiX, FiUser, FiBook, FiUsers } from "react-icons/fi";

const Field = ({ label, children }) => (
  <div>
    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">
      {label}
    </h3>
    <p className="text-sm text-slate-700">{children}</p>
  </div>
);

const ProjectDetails = ({ project, onClose }) => {
  if (!project) return null;

  const isDraft = project.status === "Draft";

  return (
    <div
      style={{ backgroundColor: "rgba(15, 23, 42, 0.6)" }}
      className="fixed inset-0 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
      onClick={onClose} // close on backdrop click
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative max-h-[88vh] overflow-y-auto animate-fade-in"
        onClick={(e) => e.stopPropagation()} // prevent closing on inner click
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-5 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition"
          >
            <FiX size={18} />
          </button>
          <h2 className="text-xl font-bold text-white pr-10">
            {project.title || "Untitled Project"}
          </h2>
          <span
            className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              isDraft
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {project.status || "N/A"}
          </span>
        </div>

        <div className="p-6">
          {/* Quick info */}
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <FiUser size={13} /> Instructor
              </p>
              <p className="text-sm font-medium text-slate-700">
                {project.instructor?.name || "—"}
              </p>
              <p className="text-xs text-slate-500">
                {project.instructor?.email}
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <FiBook size={13} /> Course
              </p>
              <p className="text-sm font-medium text-slate-700">
                {project.course?.name || "—"}
              </p>
              <p className="text-xs text-slate-500">{project.course?.code}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3">
              <p className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                <FiUsers size={13} /> Team
              </p>
              <p className="text-sm font-medium text-slate-700">
                {project.teamMembers?.length || 0} member
                {project.teamMembers?.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Team members list */}
          {project.teamMembers?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2">
                Team Members
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.teamMembers.map((mem, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-xs px-3 py-1.5 rounded-full"
                  >
                    <span className="h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-semibold">
                      {(mem.name || mem.email || "?")[0].toUpperCase()}
                    </span>
                    {mem.name || mem.email}
                    {mem.role && (
                      <span className="text-indigo-400">· {mem.role}</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detailed fields */}
          <div className="space-y-4">
            <Field label="Problem Statement">
              {project.problemStatement || "N/A"}
            </Field>
            <Field label="Objective">{project.objective || "N/A"}</Field>
            <Field label="Approach">{project.approach || "N/A"}</Field>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">
                Tools Used
              </h3>
              {project.toolsUsed?.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {project.toolsUsed.map((tool, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-md"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-700">N/A</p>
              )}
            </div>

            <Field label="Timeline">{project.timeline || "N/A"}</Field>
            <Field label="Expected Outcome">
              {project.expectedOutcome || "N/A"}
            </Field>
          </div>

          {/* Timestamps */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-400">
            <span>
              <strong className="text-slate-500">Created:</strong>{" "}
              {project.createdAt
                ? new Date(project.createdAt).toLocaleString()
                : "—"}
            </span>
            <span>
              <strong className="text-slate-500">Updated:</strong>{" "}
              {project.updatedAt
                ? new Date(project.updatedAt).toLocaleString()
                : "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
