# Library Management System

A full-stack project built using **React (Vite)**, **Node.js (Express)**, and **MongoDB Atlas**.

---

## 🚀 Quick Start (Easiest)

Simply double-click:
```
run-all.bat
```
This starts both the **Backend** (Port 5000) and **Frontend** (Port 5173), and automatically opens the application in your browser at `http://localhost:5173`.

---

## 🛠️ Manual Terminal Run

If you prefer running via separate terminals:

### 1. Run Backend Server
```powershell
cd backend
npm run dev
```
API runs at: `http://localhost:5000`

### 2. Run Frontend Client
In a second terminal:
```powershell
cd frontend
npm run dev
```
Client runs at: `http://localhost:5173`

---

## 👤 First-Time Admin Setup

1. Open `http://localhost:5173` in your browser.
2. Click **"Create admin account"** on the login page.
3. Register your initial Librarian / Admin credentials (Name, Email, Password of 8+ characters).
4. After creation, the registration endpoint automatically locks to protect the system.

---

## ✨ Features

- **Authentication**: Secure JWT token authentication with bcrypt password hashing.
- **Interactive Dashboard**: Real-time stats (Total Books, Available Copies, Registered Students, Active Issues).
- **Book Management**: Add, search, filter, and track total and available copies.
- **Student Directory**: Register student profiles with IDs, departments, and email.
- **Circulation Management**: Issue books with due date selection, track loans, and process returns with one click.
- **MongoDB Atlas Integration**: Cloud database persistence.
