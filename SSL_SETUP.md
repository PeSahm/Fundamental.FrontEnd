# SSL Development Setup

This project is configured to run with trusted SSL certificates for local development.

## 🚀 Quick Start

1. **Install CA Certificate** (One-time setup):
   ```bash
   # Run as Administrator
   .\install-ca-cert.bat
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

3. **Open your browser**:
   - Visit: `https://localhost:4200`
   - The SSL certificate should now be trusted ✅

## 🔧 Manual Certificate Installation

If the batch file doesn't work, manually install the CA certificate:

### Windows:
1. Press `Win + R`, type `certlm.msc`, and press Enter
2. Navigate to **Trusted Root Certification Authorities** → **Certificates**
3. Right-click → **All Tasks** → **Import...**
4. Select `ca.crt` from the project root
5. Complete the import wizard

### macOS:
```bash
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ca.crt
```

### Linux:
```bash
sudo cp ca.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates
```

## 📁 Certificate Files

- `ca.crt` / `ca.key` - Certificate Authority (trust this)
- `cert.crt` / `cert.key` - SSL certificate for localhost

## 🔄 Regenerating Certificates

If you need new certificates:

```bash
# Remove old certificates
rm ca.crt ca.key cert.crt cert.key

# Generate new ones
npx mkcert create-ca
npx mkcert create-cert localhost 127.0.0.1

# Reinstall CA certificate
.\install-ca-cert.bat
```

## 🛠️ Troubleshooting

**Certificate not trusted?**
- Make sure you ran `install-ca-cert.bat` as Administrator
- Restart your browser after installing the certificate
- Clear browser cache if needed

**Connection refused?**
- Ensure the dev server is running: `npm start`
- Check that port 4200 is not blocked by firewall

**Still getting warnings?**
- Try incognito/private browsing mode
- Check if other security software is interfering

## 🔒 Security Note

These certificates are for **local development only**. Never use them in production!