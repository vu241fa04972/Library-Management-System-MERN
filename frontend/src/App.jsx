import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Books from "./pages/Books";
import Students from "./pages/Students";
import Issues from "./pages/Issues";
function Protected({ children }) { const { admin } = useAuth(); return admin ? children : <Navigate to="/login" replace/>; }
export default function App() {
  const { admin } = useAuth();
  return <Routes>
    <Route path="/login" element={admin ? <Navigate to="/" replace/> : <Login/>}/>
    <Route element={<Protected><Layout/></Protected>}>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/books" element={<Books/>}/>
      <Route path="/students" element={<Students/>}/>
      <Route path="/issues" element={<Issues/>}/>
    </Route>
    <Route path="*" element={<Navigate to={admin ? "/" : "/login"} replace/>}/>
  </Routes>;
}
