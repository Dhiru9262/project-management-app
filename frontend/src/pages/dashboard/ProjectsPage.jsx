import { useOutletContext } from "react-router-dom";
import MyProjects from "../../components/MyProjects";
import TeacherDashboard from "./TeacherDashboard";

export default function ProjectsPage() {
  const { user } = useOutletContext();

  return user.role === "student" ? (
    <MyProjects email={user.email} />
  ) : (
    <TeacherDashboard user={user} />
  );
}
