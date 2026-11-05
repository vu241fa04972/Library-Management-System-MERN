@echo off
title Library Management - Backend Server
echo Starting Backend API Server (Express + MongoDB)...
cd /d "%~dp0backend"
npm run dev
pause
