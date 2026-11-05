import mongoose from "mongoose";
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  isbn: { type: String, trim: true, default: "" },
  category: { type: String, trim: true, default: "General" },
  totalCopies: { type: Number, min: 1, default: 1 },
  availableCopies: { type: Number, min: 0, default: 1 }
}, { timestamps: true });
export default mongoose.model("Book", bookSchema);
