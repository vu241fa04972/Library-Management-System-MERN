import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import auth from "../middleware/authMiddleware.js";
const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password || password.length < 8)
      return res.status(400).json({ message: "Enter your name, email and a password of at least 8 characters." });
    if (await Admin.countDocuments() > 0)
      return res.status(403).json({ message: "Admin registration is closed. Ask the system administrator to create an account." });
    const hashed = await bcrypt.hash(password, 12);
    const admin = await Admin.create({ name, email, password: hashed });
    const token = jwt.sign({ id: admin._id, name: admin.name, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.status(201).json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (e) { next(e); }
});

router.post("/login", async (req, res, next) => {
  try {
    const input = req.body.email?.toLowerCase().trim();
    if (!input) return res.status(400).json({ message: "Please enter your email." });

    // Find admin by email or name
    let admin = await Admin.findOne({ email: input });
    if (!admin) {
      admin = await Admin.findOne({
        $or: [
          { name: new RegExp(`^${input}$`, "i") },
          { email: new RegExp(input.replace(/@.*/, ""), "i") }
        ]
      });
    }
    if (!admin) {
      return res.status(401).json({ message: "No account found with this email." });
    }

    const isMatch = await bcrypt.compare(req.body.password || "", admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password. Please try again." });
    }

    const token = jwt.sign({ id: admin._id, name: admin.name, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (e) { next(e); }
});
router.get("/me", auth, async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found." });
    res.json({ admin });
  } catch (e) { next(e); }
});
export default router;
