import { useEffect, useState } from "react";
import { Plus, Search, Trash2, Users } from "lucide-react";
import api from "../services/api";
export default function Students(){
 const [items,setItems]=useState([]),[search,setSearch]=useState(""),[form,setForm]=useState({name:"",studentId:"",department:"CSE",email:""}),[error,setError]=useState("");
 const load=()=>api.get("/students").then(r=>setItems(r.data)).catch(e=>setError(e.response?.data?.message||"Unable to load students."));
 useEffect(()=>{load();},[]);
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 async function add(e){e.preventDefault();setError("");try{await api.post("/students",form);setForm({name:"",studentId:"",department:"CSE",email:""});load();}catch(e){setError(e.response?.data?.message||"Could not add student. Student ID may already exist.");}}
 async function remove(id){if(!confirm("Delete this student record?"))return;try{await api.delete(`/students/${id}`);load();}catch(e){setError(e.response?.data?.message||"Could not delete student.");}}
 const filtered=items.filter(s=>`${s.name} ${s.studentId} ${s.department}`.toLowerCase().includes(search.toLowerCase()));
 return <><div className="page-heading"><div><span className="eyebrow">PEOPLE DIRECTORY</span><h1>Students</h1><p>Manage student profiles registered with the library.</p></div><div className="heading-count">{items.length} registered students</div></div>{error&&<div className="error-message">{error}</div>}
 <div className="panel form-panel"><div className="panel-heading"><div><h3><Plus size={17}/> Register student</h3><p>Add a student to the library directory.</p></div></div><form className="inline-form student-form" onSubmit={add}><label>Student name<input name="name" value={form.name} onChange={change} required placeholder="Full name"/></label><label>Student ID<input name="studentId" value={form.studentId} onChange={change} required placeholder="e.g. 23CS001"/></label><label>Department<input name="department" value={form.department} onChange={change} placeholder="CSE"/></label><label>Email<input name="email" type="email" value={form.email} onChange={change} placeholder="student@email.com"/></label><button className="primary-button"><Plus size={16}/> Add student</button></form></div>
 <div className="panel"><div className="panel-heading"><div><h3>Student directory</h3><p>Registered library members.</p></div><div className="search-box"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search students..."/></div></div>
 {filtered.length===0?<div className="empty-state"><Users size={28}/><b>No students found</b><span>Register a student or adjust your search.</span></div>:<div className="table-wrap"><table><thead><tr><th>STUDENT</th><th>STUDENT ID</th><th>DEPARTMENT</th><th>EMAIL</th><th></th></tr></thead><tbody>{filtered.map(s=><tr key={s._id}><td><b>{s.name}</b></td><td>{s.studentId}</td><td>{s.department}</td><td>{s.email||"—"}</td><td><button className="icon-button danger" title="Delete student" onClick={()=>remove(s._id)}><Trash2 size={16}/></button></td></tr>)}</tbody></table></div>}</div></>;
}
