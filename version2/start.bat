@echo off
REM Civic AI Talent Match - Startup Script for Windows

echo.
echo 🎯 Civic AI Talent Match - Version 2
echo ======================================
echo.

REM Check if python3 is available
python3 --version >nul 2>&1
if %errorlevel% equ 0 (
    echo 🚀 Starting server with Python 3...
    echo 📍 Opening http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    python3 -m http.server 8000
    goto :end
)

REM Check if python is available
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo 🚀 Starting server with Python 2...
    echo 📍 Opening http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    python -m SimpleHTTPServer 8000
    goto :end
)

REM Check if http-server is available
http-server --version >nul 2>&1
if %errorlevel% equ 0 (
    echo 🚀 Starting server with http-server...
    echo 📍 Opening http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    http-server -p 8000
    goto :end
)

REM Check if php is available
php --version >nul 2>&1
if %errorlevel% equ 0 (
    echo 🚀 Starting server with PHP...
    echo 📍 Opening http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server
    echo.
    php -S localhost:8000
    goto :end
)

REM No suitable server found
echo ❌ Error: No suitable server found!
echo.
echo Please install one of the following:
echo   • Python (python3 or python)
echo   • Node.js (then: npm install -g http-server)
echo   • PHP
echo.
echo Or open index.html directly in your browser

:end
pause
