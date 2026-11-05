@echo off
title Library Management System Launcher
echo ========================================================
echo     LIBRARY MANAGEMENT SYSTEM (REACT + MONGODB)
echo ========================================================
echo.
echo Starting Backend API Server...
start "Library Backend Server (Port 5000)" cmd /k "cd /d %~dp0backend && npm run dev"
timeout /t 3 /nobreak >nul
echo Starting Frontend React Client...
start "Library Frontend Client (Port 5173)" cmd /k "cd /d %~dp0frontend && npm run dev"
timeout /t 2 /nobreak >nul
echo Opening Library Portal in your default browser...
start http://localhost:5173
echo.
echo --------------------------------------------------------
echo Both servers are up and running!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000
echo --------------------------------------------------------
echo.
pause
