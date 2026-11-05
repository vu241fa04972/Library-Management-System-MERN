import { Router } from "express";
import Student from "../models/Student.js";
import Issue from "../models/Issue.js";
import auth from "../middleware/authMiddleware.js";
const router = Router();
router.use(auth);
router.get("/", async (_req, res, next) => { try { res.json(await Student.find().sort({ createdAt: -1 })); } catch(e){next(e);} });
router.post("/", async (req, res, next) => {
  try {
    const { name, studentId, department, email } = req.body;
    if (!name?.trim() || !studentId?.trim()) return res.status(400).json({ message: "Student name and ID are required." });
    res.status(201).json(await Student.create({ name, studentId, department, email }));
  } catch(e){next(e);}
});
router.delete("/:id", async (req, res, next) => {
  try {
    if (await Issue.exists({ student: req.params.id, status: "Issued" })) return res.status(400).json({ message: "Student has an active book issue." });
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found." });
    res.json({ message: "Student deleted." });
  } catch(e){next(e);}
});
export default router;
