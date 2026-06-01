import { useNavigate, useOutletContext, Navigate, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import CreateProject from "../../components/CreateProject";

export default function NewProjectPage() {
  const { user } = useOutletContext();
  const navigate = useNavigate();

  // Only students can create projects
  if (user.role !== "student") {
    return <Navigate to="/dashboard/projects" replace />;
  }

  return (
    <div className="space-y-4">
      <Link
        to="/dashboard/projects"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-indigo-600 transition"
      >
        <FiArrowLeft size={16} /> Back to My Projects
      </Link>

      <CreateProject onProjectAdded={() => navigate("/dashboard/projects")} />
    </div>
  );
}
