import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  studentId: { type: String, required: true, unique: true, trim: true },
  department: { type: String, trim: true, default: "CSE" },
  email: { type: String, trim: true, lowercase: true, default: "" }
}, { timestamps: true });
export default mongoose.model("Student", studentSchema);
