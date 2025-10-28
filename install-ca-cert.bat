@echo off
echo Installing mkcert CA certificate for trusted SSL development...
echo.

REM Install the CA certificate to the Local Machine Trusted Root store
certutil -addstore "Root" "%~dp0ca.crt"

if %errorlevel% equ 0 (
    echo.
    echo ✅ CA certificate installed successfully!
    echo Your browser should now trust SSL certificates from mkcert.
    echo.
    echo 🔄 Please restart your browser if it's currently open.
    echo.
    echo 🌐 You can now visit: https://localhost:4200
    echo.
) else (
    echo.
    echo ❌ Failed to install CA certificate.
    echo Please run this script as Administrator or manually install ca.crt
    echo.
)

pause