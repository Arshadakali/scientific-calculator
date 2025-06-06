# Check if emsdk directory exists
if (-not (Test-Path "C:\emsdk")) {
    Write-Host "Please download Emscripten SDK manually and extract it to C:\emsdk"
    Write-Host "Download from: https://github.com/emscripten-core/emsdk/archive/refs/heads/main.zip"
    exit 1
}

# Navigate to emsdk directory
Set-Location C:\emsdk\emsdk-main

# Install and activate latest version
.\emsdk install latest
.\emsdk activate latest

# Set environment variables
$env:EMSDK = "C:\emsdk\emsdk-main"
$env:EMSDK_NODE = "$env:EMSDK\node\14.18.2_64bit\bin\node.exe"
$env:EMSDK_PYTHON = "$env:EMSDK\python\3.9.2_64bit\python.exe"
$env:PATH = "$env:EMSDK;$env:EMSDK\upstream\emscripten;$env:PATH"

Write-Host "Emscripten setup complete!" 