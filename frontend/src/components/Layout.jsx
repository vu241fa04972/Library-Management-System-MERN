import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BookOpen, LayoutDashboard, Users, BookCopy, Repeat2, BarChart3, LogOut, Library } from "lucide-react";
import { useAuth } from "../context/AuthContext";
const links = [
  ["/", "Dashboard", LayoutDashboard], ["/books", "Books", BookOpen],
  ["/students", "Students", Users], ["/issues", "Issue & Returns", Repeat2]
];
export default function Layout() {
  const { admin, logout } = useAuth(); const navigate = useNavigate();
  const signOut = () => { logout(); navigate("/login"); };
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><Library size={22}/></div><div><b>VIGNAN</b><small>LIBRARY PORTAL</small></div></div>
      <div className="nav-label">WORKSPACE</div>
      <nav>{links.map(([to, label, Icon]) => <NavLink key={to} to={to} end={to === "/"} className={({isActive}) => isActive ? "nav-link active" : "nav-link"}><Icon size={18}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="profile"><div className="avatar">{admin?.name?.[0]?.toUpperCase() || "A"}</div><div className="profile-info"><b>{admin?.name || "Administrator"}</b><small>Library Admin</small></div></div><button className="logout-button" onClick={signOut}><LogOut size={17}/> Sign out</button></div>
    </aside>
    <main className="main-area"><header className="topbar"><div><span className="eyebrow">VIGNAN UNIVERSITY</span><b>Library Management System</b></div><div className="top-user"><span className="online-dot"/> System online <div className="avatar small">{admin?.name?.[0]?.toUpperCase() || "A"}</div></div></header><section className="page-content"><Outlet/></section><footer>Vignan University · Library Management Portal</footer></main>
  </div>;
}
