@echo off
echo Starting Mobywatel Frontend Server...
echo.

echo Checking if Python is installed...
python --version >nul 2>&1
if errorlevel 1 (
    echo Python not found, trying python3...
    python3 --version >nul 2>&1
    if errorlevel 1 (
        echo ERROR: Python is not installed or not in PATH
        echo Please install Python from https://python.org/
        pause
        exit /b 1
    ) else (
        set PYTHON_CMD=python3
    )
) else (
    set PYTHON_CMD=python
)

echo Python version:
%PYTHON_CMD% --version

echo.
echo Starting frontend server...
echo Frontend will be available at: http://localhost:8080
echo Press Ctrl+C to stop the server
echo.
echo Open your browser and go to: http://localhost:8080/login.html
echo.

%PYTHON_CMD% -m http.server 8080

pause