# 🚀 Installation Guide - Professional Resume Builder

<div align="center">

![Installation Guide](https://img.shields.io/badge/Installation-Guide-blue?style=for-the-badge&logo=gear&logoColor=white)

**Complete step-by-step installation guide for the Resume Builder application**

</div>

---

## 📋 Table of Contents

- [🔧 Quick Setup](#-quick-setup)
- [📋 Prerequisites](#-prerequisites)  
- [💻 Installation Methods](#-installation-methods)
- [🐛 Troubleshooting](#-troubleshooting)
- [🚀 Running the Application](#-running-the-application)
- [⚡ Quick Commands](#-quick-commands)

---

## 🔧 Quick Setup

### Option 1: Automated Setup (Recommended)

**Windows Batch File:**
```bash
# Double-click setup.bat in the project folder
.\setup.bat
```

**PowerShell Script:**
```powershell
# Right-click and "Run with PowerShell"
.\setup.ps1
```

**Python Launcher:**
```bash
python launcher.py
```

### Option 2: One-Line Install
```bash
# Navigate to project folder first
python -m pip install -r requirements.txt && python app.py
```

---

## 📋 Prerequisites

### System Requirements
- **Operating System**: Windows 7/10/11, macOS 10.12+, or Linux
- **Python**: Version 3.8 or higher
- **Memory**: 2GB RAM minimum
- **Storage**: 100MB free space
- **Browser**: Chrome, Firefox, Safari, or Edge

### Required Software
- Python 3.8+ with pip
- Modern web browser
- Internet connection (for initial setup)

---

## 💻 Installation Methods

### Method 1: Python.org (Recommended)

1. **Download Python**
   - Visit [python.org/downloads](https://www.python.org/downloads/)
   - Download the latest Python 3.x version
   - Choose the installer for your operating system

2. **Install Python**
   ```bash
   # During installation, IMPORTANT:
   ☑️ Check "Add Python to PATH"
   ☑️ Check "Install pip"
   ☑️ Choose "Add Python to environment variables"
   ```

3. **Verify Installation**
   ```bash
   python --version
   # Should show: Python 3.x.x
   
   pip --version
   # Should show: pip x.x.x
   ```

### Method 2: Microsoft Store (Windows 10/11)

1. Open Microsoft Store
2. Search for "Python 3.x"
3. Click "Install"
4. Verify installation in Command Prompt

### Method 3: Chocolatey (Windows)

```powershell
# Install Chocolatey first (if not installed)
# Then install Python
choco install python
```

### Method 4: Homebrew (macOS)

```bash
# Install Homebrew first (if not installed)
# Then install Python
brew install python
```

### Method 5: Package Manager (Linux)

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 python3-pip

# CentOS/RHEL
sudo yum install python3 python3-pip

# Fedora
sudo dnf install python3 python3-pip
```

---

## 🚀 Running the Application

### Step 1: Navigate to Project Directory
```bash
cd "path/to/resume builder"
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Start the Application
```bash
python app.py
```

### Step 4: Access in Browser
```
Open your browser and visit: http://localhost:5000
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. "Python not found" Error

**Problem**: Command prompt doesn't recognize `python` command

**Solutions**:
```bash
# Try these alternatives:
python3 --version
py --version
python.exe --version

# Add Python to PATH manually:
# Windows: Add Python installation folder to System PATH
# macOS/Linux: Add to ~/.bashrc or ~/.zshrc
export PATH="/usr/local/bin/python3:$PATH"
```

#### 2. "pip not found" Error

**Solutions**:
```bash
# Use python -m pip instead
python -m pip install -r requirements.txt

# Or reinstall pip
python -m ensurepip --upgrade
```

#### 3. Permission Denied Errors

**Solutions**:
```bash
# Use --user flag
pip install --user -r requirements.txt

# Or run as administrator (Windows)
# Or use sudo (macOS/Linux) - not recommended
```

#### 4. SSL Certificate Errors

**Solutions**:
```bash
pip install --trusted-host pypi.org --trusted-host pypi.python.org --trusted-host files.pythonhosted.org -r requirements.txt
```

#### 5. Port 5000 Already in Use

**Solutions**:
```bash
# Kill process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:5000 | xargs kill -9

# Or change port in app.py:
app.run(debug=True, port=5001)
```

#### 6. Module Import Errors

**Solutions**:
```bash
# Reinstall dependencies
pip uninstall -r requirements.txt -y
pip install -r requirements.txt

# Check Python version compatibility
python --version
```

#### 7. Browser Won't Load Application

**Solutions**:
- Check if the server is running (look for "Running on http://127.0.0.1:5000")
- Try different browsers
- Clear browser cache
- Disable browser extensions
- Try incognito/private mode

---

## ⚡ Quick Commands

### Development Commands
```bash
# Start development server
python app.py

# Install/Update dependencies
pip install -r requirements.txt --upgrade

# Check Python version
python --version

# List installed packages
pip list

# Create virtual environment (optional)
python -m venv resume_builder_env
# Activate it:
# Windows: resume_builder_env\Scripts\activate
# macOS/Linux: source resume_builder_env/bin/activate
```

### Maintenance Commands
```bash
# Update pip
python -m pip install --upgrade pip

# Check for outdated packages
pip list --outdated

# Generate requirements file (if developing)
pip freeze > requirements.txt
```

---

## 🔧 Advanced Installation

### Using Virtual Environment (Recommended for Developers)

1. **Create Virtual Environment**
   ```bash
   python -m venv resume_builder_env
   ```

2. **Activate Virtual Environment**
   ```bash
   # Windows
   resume_builder_env\Scripts\activate
   
   # macOS/Linux
   source resume_builder_env/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run Application**
   ```bash
   python app.py
   ```

5. **Deactivate When Done**
   ```bash
   deactivate
   ```

### Docker Installation (Optional)

If you prefer using Docker:

1. **Create Dockerfile** (already included)
2. **Build Image**
   ```bash
   docker build -t resume-builder .
   ```
3. **Run Container**
   ```bash
   docker run -p 5000:5000 resume-builder
   ```

---

## 📱 Platform-Specific Notes

### Windows
- Use Command Prompt or PowerShell
- May need to run as Administrator for some operations
- Windows Defender might flag downloads (add exception if needed)

### macOS
- Use Terminal application
- May need to install Xcode Command Line Tools
- Some versions may require `python3` instead of `python`

### Linux
- Use terminal
- May need to install additional system packages
- Check your distribution's package manager

---

## 🎯 Verification Steps

After installation, verify everything works:

1. **Check Python Installation**
   ```bash
   python --version
   # Expected: Python 3.8.x or higher
   ```

2. **Check Dependencies**
   ```bash
   pip list | grep -E "(Flask|reportlab)"
   # Should show Flask and reportlab
   ```

3. **Test Application Start**
   ```bash
   python app.py
   # Should show: "Running on http://127.0.0.1:5000"
   ```

4. **Test Browser Access**
   - Open http://localhost:5000
   - Should see the Resume Builder interface

5. **Test Core Functions**
   - Fill out a form field
   - Should see live preview update
   - Try saving (should get success message)

---

## 🆘 Getting Help

If you're still having issues:

1. **Check the Error Messages** - Read them carefully
2. **Google the Error** - Often has quick solutions
3. **Check Python/pip Versions** - Ensure compatibility
4. **Try Different Terminal** - Command Prompt vs PowerShell vs Terminal
5. **Restart Computer** - Sometimes fixes PATH issues
6. **Reinstall Python** - Last resort, but often works

### Support Resources
- 📧 Create an issue in the project repository
- 📖 Check the main README.md file
- 🐍 Python.org documentation
- 🔍 Stack Overflow for Python/Flask issues

---

<div align="center">

**🎉 Congratulations! You should now have a fully functional Resume Builder application! 🎉**

If you successfully completed the installation, you can now create professional resumes with ease.

</div>
