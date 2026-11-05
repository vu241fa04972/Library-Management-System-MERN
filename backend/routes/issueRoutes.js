import { Router } from "express";
import Issue from "../models/Issue.js";
import Book from "../models/Book.js";
import Student from "../models/Student.js";
import auth from "../middleware/authMiddleware.js";
const router = Router();
router.use(auth);
router.get("/", async (_req, res, next) => {
  try { res.json(await Issue.find().populate("book", "title author").populate("student", "name studentId").sort({ createdAt: -1 })); }
  catch(e){next(e);}
});
router.post("/", async (req, res, next) => {
  try {
    const { bookId, studentId, dueDate } = req.body;
    const [book, student] = await Promise.all([Book.findById(bookId), Student.findById(studentId)]);
    if (!book || !student) return res.status(404).json({ message: "Select a valid book and student." });
    if (book.availableCopies < 1) return res.status(400).json({ message: "No copies are currently available." });
    const due = new Date(dueDate);
    if (!dueDate || Number.isNaN(due.getTime()) || due <= new Date()) return res.status(400).json({ message: "Choose a future due date." });
    book.availableCopies -= 1;
    await book.save();
    try {
      const issue = await Issue.create({ book: book._id, student: student._id, dueDate: due });
      res.status(201).json(await issue.populate([{ path: "book", select: "title author" }, { path: "student", select: "name studentId" }]));
    } catch (e) { book.availableCopies += 1; await book.save(); throw e; }
  } catch(e){next(e);}
});
router.patch("/:id/return", async (req, res, next) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue record not found." });
    if (issue.status === "Returned") return res.status(400).json({ message: "This book is already returned." });
    issue.status = "Returned"; issue.returnDate = new Date();
    await issue.save();
    await Book.findByIdAndUpdate(issue.book, { $inc: { availableCopies: 1 } });
    res.json(await issue.populate([{ path: "book", select: "title author" }, { path: "student", select: "name studentId" }]));
  } catch(e){next(e);}
});
export default router;
