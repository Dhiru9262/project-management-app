import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/me", {
          method: "GET",
          credentials: "include", // send cookie
        });

        if (res.status === 401) {
          navigate("/login");
          return;
        }

        const data = await res.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">No user found</p>;
  }

  console.log(user);
  return (
    <div style={{ backgroundColor: "#B2D3C2" }} className="min-h-screen p-6">
      {/* <h1 className="text-2xl font-bold mb-6">
        Welcome, {user.name} 👋 ({user.role})
      </h1> */}

      {user.role === "student" ? (
        <StudentDashboard user={user} />
      ) : (
        <TeacherDashboard user={user} />
      )}
    </div>
  );
}
export default Dashboard;
