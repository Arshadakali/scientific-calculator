# Set up Emscripten environment
$env:EMSDK = "C:\emsdk\emsdk-main"
$env:EMSDK_NODE = "$env:EMSDK\node\14.18.2_64bit\bin\node.exe"
$env:EMSDK_PYTHON = "$env:EMSDK\python\3.9.2_64bit\python.exe"
$env:PATH = "$env:EMSDK;$env:EMSDK\upstream\emscripten;$env:PATH"

# Compile C++ code to WebAssembly
emcc cpp/calculator.cpp -o public/calculator.js -s WASM=1 -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap"]' -s EXPORTED_FUNCTIONS='["_main"]'

Write-Host "Build complete! Output files are in the public directory." 