import React from "react";

const ProjectDetails = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      style={{ backgroundColor: "#B2D3C2" }}
      className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose} // close on backdrop click
    >
      <div
        className="bg-white rounded-2xl shadow-xl p-6 w-11/12 sm:w-2/3 md:w-1/2 relative max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // prevent closing on inner click
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-700"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-3 text-gray-800">
          {project.title || "Untitled Project"}
        </h2>

        {/* Status */}
        <p
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
            project.status === "Draft"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {project.status || "N/A"}
        </p>

        {/* Basic Info */}
        <div className="space-y-2 text-sm text-gray-700 mb-4">
          <p>
            <strong>Instructor:</strong> {project.instructor?.name} (
            {project.instructor?.email})
          </p>
          <p>
            <strong>Course:</strong> {project.course?.name} (
            {project.course?.code})
          </p>
          <p>
            <strong>Team Members:</strong>{" "}
            {project.teamMembers?.length > 0
              ? project.teamMembers.map((mem, idx) => (
                  <span key={idx}>
                    {mem.email}
                    {idx < project.teamMembers.length - 1 ? ", " : ""}
                  </span>
                ))
              : "No members added"}
          </p>
        </div>

        <hr className="my-3" />

        {/* Detailed Info */}
        <div className="space-y-3 text-sm text-gray-800">
          <div>
            <h3 className="font-semibold text-gray-900">Problem Statement:</h3>
            <p>{project.problemStatement || "N/A"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Objective:</h3>
            <p>{project.objective || "N/A"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Approach:</h3>
            <p>{project.approach || "N/A"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Tools Used:</h3>
            {project.toolsUsed && project.toolsUsed.length > 0 ? (
              <ul className="list-disc pl-6">
                {project.toolsUsed.map((tool, idx) => (
                  <li key={idx}>{tool}</li>
                ))}
              </ul>
            ) : (
              <p>N/A</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Timeline:</h3>
            <p>{project.timeline || "N/A"}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Expected Outcome:</h3>
            <p>{project.expectedOutcome || "N/A"}</p>
          </div>

          <div className="text-xs text-gray-500 mt-4">
            <p>
              <strong>Created:</strong>{" "}
              {new Date(project.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Last Updated:</strong>{" "}
              {new Date(project.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
