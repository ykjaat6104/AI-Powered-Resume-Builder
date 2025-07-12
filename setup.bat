@echo off
echo Resume Builder Setup Script
echo ==========================
echo.
echo This script will help you set up the Resume Builder application.
echo.

echo Step 1: Checking if Python is installed...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Python is installed!
    python --version
    goto :install_deps
) else (
    echo Python is not installed or not in PATH.
    echo.
    echo Please install Python from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation.
    echo.
    echo After installing Python, run this script again.
    pause
    exit /b 1
)

:install_deps
echo.
echo Step 2: Installing Python dependencies...
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

if %errorlevel% equ 0 (
    echo.
    echo Dependencies installed successfully!
    echo.
    echo Step 3: Starting the Resume Builder application...
    echo.
    echo The application will start on http://localhost:5000
    echo Press Ctrl+C to stop the server when you're done.
    echo.
    python app.py
) else (
    echo.
    echo Error installing dependencies. Please check the error messages above.
    pause
)
