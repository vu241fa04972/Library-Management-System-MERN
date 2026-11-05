import { Router } from "express";
import Book from "../models/Book.js";
import auth from "../middleware/authMiddleware.js";
const router = Router();
router.use(auth);
router.get("/", async (_req, res, next) => { try { res.json(await Book.find().sort({ createdAt: -1 })); } catch(e){next(e);} });
router.post("/", async (req, res, next) => {
  try {
    const { title, author, isbn, category, totalCopies } = req.body;
    if (!title?.trim() || !author?.trim()) return res.status(400).json({ message: "Title and author are required." });
    const count = Math.max(1, Number(totalCopies) || 1);
    res.status(201).json(await Book.create({ title, author, isbn, category, totalCopies: count, availableCopies: count }));
  } catch(e){next(e);}
});
router.delete("/:id", async (req, res, next) => {
  try {
    const active = await (await import("../models/Issue.js")).default.exists({ book: req.params.id, status: "Issued" });
    if (active) return res.status(400).json({ message: "Return this book before deleting it." });
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Book not found." });
    res.json({ message: "Book deleted." });
  } catch(e){next(e);}
});
export default router;
