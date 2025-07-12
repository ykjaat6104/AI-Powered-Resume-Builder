#!/usr/bin/env python3
"""
Resume Builder Launcher
This script provides an easy way to start the Resume Builder application.
"""

import sys
import subprocess
import os
from pathlib import Path

def check_python():
    """Check if Python is properly installed."""
    try:
        version = sys.version_info
        if version.major >= 3 and version.minor >= 8:
            print(f"✓ Python {version.major}.{version.minor}.{version.micro} detected")
            return True
        else:
            print(f"✗ Python {version.major}.{version.minor}.{version.micro} is too old")
            print("Please install Python 3.8 or newer")
            return False
    except Exception as e:
        print(f"✗ Error checking Python version: {e}")
        return False

def check_dependencies():
    """Check if required packages are installed."""
    required_packages = ['flask', 'reportlab']
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
            print(f"✓ {package} is installed")
        except ImportError:
            missing_packages.append(package)
            print(f"✗ {package} is missing")
    
    return missing_packages

def install_dependencies():
    """Install missing dependencies."""
    print("\n📦 Installing dependencies...")
    try:
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', 'requirements.txt'])
        print("✓ Dependencies installed successfully!")
        return True
    except subprocess.CalledProcessError as e:
        print(f"✗ Error installing dependencies: {e}")
        return False

def start_application():
    """Start the Flask application."""
    print("\n🚀 Starting Resume Builder...")
    print("📱 Open your browser and go to: http://localhost:5000")
    print("⏹️  Press Ctrl+C to stop the server\n")
    
    try:
        import app
        app.app.run(debug=True, port=5000)
    except KeyboardInterrupt:
        print("\n👋 Application stopped by user")
    except Exception as e:
        print(f"\n✗ Error starting application: {e}")

def main():
    """Main launcher function."""
    print("=" * 50)
    print("🏗️  RESUME BUILDER LAUNCHER")
    print("=" * 50)
    
    # Check Python version
    if not check_python():
        input("Press Enter to exit...")
        return
    
    # Check if we're in the right directory
    if not os.path.exists('app.py'):
        print("✗ app.py not found. Please run this script from the project directory.")
        input("Press Enter to exit...")
        return
    
    # Check dependencies
    missing = check_dependencies()
    
    if missing:
        print(f"\n📋 Missing packages: {', '.join(missing)}")
        install_deps = input("Install missing dependencies? (y/n): ").lower().strip()
        
        if install_deps in ['y', 'yes']:
            if install_dependencies():
                # Re-check dependencies
                missing = check_dependencies()
                if missing:
                    print("✗ Some dependencies could not be installed.")
                    input("Press Enter to exit...")
                    return
            else:
                input("Press Enter to exit...")
                return
        else:
            print("Cannot start application without required dependencies.")
            input("Press Enter to exit...")
            return
    
    # Start the application
    start_application()

if __name__ == "__main__":
    main()
