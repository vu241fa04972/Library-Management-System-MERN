import mongoose from "mongoose";
const issueSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  issueDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date, default: null },
  status: { type: String, enum: ["Issued", "Returned"], default: "Issued" }
}, { timestamps: true });
export default mongoose.model("Issue", issueSchema);
