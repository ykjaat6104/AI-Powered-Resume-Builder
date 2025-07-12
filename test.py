#!/usr/bin/env python3
"""
Resume Builder - System Test
This script tests if all components are working correctly.
"""

import sys
import os
import subprocess
import importlib.util

def test_python_version():
    """Test if Python version is compatible."""
    version = sys.version_info
    if version.major >= 3 and version.minor >= 8:
        print(f"✅ Python {version.major}.{version.minor}.{version.micro} - Compatible")
        return True
    else:
        print(f"❌ Python {version.major}.{version.minor}.{version.micro} - Too old (need 3.8+)")
        return False

def test_dependencies():
    """Test if required packages are installed."""
    required_packages = {
        'flask': 'Flask',
        'reportlab': 'ReportLab'
    }
    
    all_installed = True
    
    for package, display_name in required_packages.items():
        try:
            spec = importlib.util.find_spec(package)
            if spec is not None:
                print(f"✅ {display_name} - Installed")
            else:
                print(f"❌ {display_name} - Not found")
                all_installed = False
        except ImportError:
            print(f"❌ {display_name} - Import error")
            all_installed = False
    
    return all_installed

def test_file_structure():
    """Test if all required files exist."""
    required_files = [
        'app.py',
        'requirements.txt',
        'templates/index.html',
        'static/css/style.css',
        'static/js/script.js'
    ]
    
    all_exist = True
    
    for file_path in required_files:
        if os.path.exists(file_path):
            print(f"✅ {file_path} - Found")
        else:
            print(f"❌ {file_path} - Missing")
            all_exist = False
    
    return all_exist

def test_app_import():
    """Test if the main app can be imported."""
    try:
        import app
        print("✅ App module - Can be imported")
        return True
    except Exception as e:
        print(f"❌ App module - Import error: {e}")
        return False

def run_quick_test():
    """Run a quick functionality test."""
    try:
        import app
        # Test basic Flask app creation
        if hasattr(app, 'app') and app.app:
            print("✅ Flask app - Created successfully")
            return True
        else:
            print("❌ Flask app - Creation failed")
            return False
    except Exception as e:
        print(f"❌ Flask app test - Error: {e}")
        return False

def main():
    """Run all tests."""
    print("=" * 60)
    print("🔍 RESUME BUILDER - SYSTEM TEST")
    print("=" * 60)
    print()
    
    tests = [
        ("Python Version", test_python_version),
        ("File Structure", test_file_structure),
        ("Dependencies", test_dependencies),
        ("App Import", test_app_import),
        ("Quick Test", run_quick_test)
    ]
    
    results = []
    
    for test_name, test_func in tests:
        print(f"🧪 Testing {test_name}...")
        result = test_func()
        results.append(result)
        print()
    
    # Summary
    print("=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(results)
    total = len(results)
    
    if passed == total:
        print(f"🎉 ALL TESTS PASSED ({passed}/{total})")
        print("✅ Your Resume Builder installation is ready!")
        print("🚀 Run 'python app.py' to start the application")
    else:
        print(f"⚠️  SOME TESTS FAILED ({passed}/{total})")
        print("❌ Please check the errors above and reinstall if needed")
        print("📖 See INSTALLATION.md for troubleshooting")
    
    print()
    print("💡 Quick start commands:")
    print("   python app.py                 # Start the application")
    print("   pip install -r requirements.txt  # Install dependencies")
    print("   python test.py                # Run this test again")

if __name__ == "__main__":
    main()
