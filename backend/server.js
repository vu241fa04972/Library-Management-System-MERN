import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import issueRoutes from "./routes/issueRoutes.js";

// Ensure reliable DNS resolution for MongoDB Atlas SRV records
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
  // fallback to system DNS if custom servers are not permitted
}

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ status: "ok", message: "Library API is running" }));
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/issues", issueRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  console.error("Missing MONGODB_URI or JWT_SECRET. Please check backend/.env.");
  process.exit(1);
}

if (process.env.MONGODB_URI.includes("<username>") || process.env.MONGODB_URI.includes("<password>")) {
  console.error("\n[!] Please update your backend/.env file with your actual MongoDB connection string.");
  console.error("    Replace <username> and <password> with your database user credentials.\n");
  process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    console.error("\nTip: If using MongoDB Atlas:");
    console.error("  1. Ensure your IP address is whitelisted (Network Access -> Allow Access From Anywhere: 0.0.0.0/0).");
    console.error("  2. Double-check your database username and password in backend/.env.\n");
    process.exit(1);
  });
