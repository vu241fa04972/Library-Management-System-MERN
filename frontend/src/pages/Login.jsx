import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Library, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
export default function Login() {
  const [mode, setMode] = useState("login"); const [name, setName] = useState("");
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [error, setError] = useState(""); const [busy, setBusy] = useState(false);
  const { login, register } = useAuth(); const navigate = useNavigate();
  async function submit(e) {
    e.preventDefault(); setError(""); setBusy(true);
    try { if (mode === "register") await register(name, email, password); else await login(email, password); navigate("/"); }
    catch (err) { setError(err.response?.data?.message || "Unable to connect. Check that the backend is running."); }
    finally { setBusy(false); }
  }
  return <div className="login-page"><div className="login-decoration"><div className="login-orb orb-one"/><div className="login-orb orb-two"/><div className="login-brand"><div className="brand-mark"><Library size={25}/></div><span>VIGNAN UNIVERSITY</span></div><div className="login-message"><span className="eyebrow light">KNOWLEDGE · ACCESS · EXCELLENCE</span><h1>Your library,<br/><em>beautifully</em> managed.</h1><p>A unified digital workspace for managing books, students and circulation records.</p><div className="login-stat"><b>LIBRARY MANAGEMENT SYSTEM</b><span>ADMINISTRATION PORTAL</span></div></div></div>
  <div className="login-panel"><form className="login-form" onSubmit={submit}><div className="form-icon"><LockKeyhole size={23}/></div><span className="eyebrow">SECURE ACCESS</span><h2>{mode === "login" ? "Welcome back" : "Create admin account"}</h2><p className="muted">{mode === "login" ? "Sign in to continue to your dashboard." : "Set up the first librarian account for this system."}</p>
  {mode === "register" && <label>Full name<div className="input-wrap"><UserRound size={17}/><input value={name} onChange={e=>setName(e.target.value)} required placeholder="Your name"/></div></label>}
  <label>Email address<div className="input-wrap"><Mail size={17}/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="admin@vignan.ac.in"/></div></label>
  <label>Password<div className="input-wrap"><LockKeyhole size={17}/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8} placeholder="At least 8 characters"/></div></label>
  {error && <div className="error-message">{error}</div>}<button className="primary-button full" disabled={busy}>{busy ? "Please wait..." : mode === "login" ? "Sign in to dashboard" : "Create admin account"}</button>
  <p className="switch-mode">{mode === "login" ? "First time setup?" : "Already have an account?"} <button type="button" onClick={()=>{setMode(mode==="login"?"register":"login");setError("");}}>{mode==="login"?"Create admin account":"Sign in"}</button></p>
  <div className="secure-note">Protected administrator access · JWT authentication</div></form></div></div>;
}
