import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiCheckSquare,
  FiGrid,
  FiFolder,
  FiPlusCircle,
  FiInbox,
  FiLogOut,
} from "react-icons/fi";
import { API_BASE } from "../config";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0].toUpperCase())
    .join("");
}

const studentNav = [
  { to: "/dashboard", label: "Overview", icon: FiGrid, end: true },
  { to: "/dashboard/projects", label: "My Projects", icon: FiFolder },
  { to: "/dashboard/projects/new", label: "New Project", icon: FiPlusCircle },
];

const teacherNav = [
  { to: "/dashboard", label: "Overview", icon: FiGrid, end: true },
  { to: "/dashboard/projects", label: "Assigned Projects", icon: FiInbox },
];

export default function DashboardLayout() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/user/me`, {
          method: "GET",
          credentials: "include",
        });
        if (res.status === 401) {
          navigate("/login");
          return;
        }
        setUser(await res.json());
      } catch (err) {
        console.error(err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-indigo-50 via-slate-50 to-slate-100">
        <span className="h-10 w-10 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
        <p className="text-slate-600 font-medium">Loading…</p>
      </div>
    );
  }

  if (!user) return null;

  const navItems = user.role === "student" ? studentNav : teacherNav;

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
      isActive
        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-slate-50 to-slate-100">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-64 flex-col bg-white border-r border-slate-200 p-4">
        <div className="flex items-center gap-2.5 px-2 py-3 mb-4">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
            <FiCheckSquare className="text-white" size={18} />
          </div>
          <span className="font-bold text-slate-800">Project Mgmt</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User card */}
        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center text-sm font-semibold">
              {getInitials(user.name)}
            </div>
            <div className="leading-tight min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">
                {user.name}
              </p>
              <p className="text-xs text-slate-400 capitalize">{user.role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
          >
            <FiLogOut size={16} /> Log out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <FiCheckSquare className="text-white" size={16} />
            </div>
            <span className="font-bold text-slate-800 text-sm">
              Project Mgmt
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-500 hover:text-rose-600"
            title="Log out"
          >
            <FiLogOut size={18} />
          </button>
        </div>
        <nav className="flex gap-1 px-3 pb-2 overflow-x-auto">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-600 bg-slate-100"
                }`
              }
            >
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Main content */}
      <main className="md:pl-64">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <Outlet context={{ user }} />
        </div>
      </main>
    </div>
  );
}
