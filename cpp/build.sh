#!/bin/bash

# Compile C++ to WebAssembly
emcc calculator.cpp \
    -o calculator.js \
    -s WASM=1 \
    -s MODULARIZE=1 \
    -s EXPORT_NAME="createCalculatorModule" \
    -s EXPORTED_FUNCTIONS="['_malloc', '_free']" \
    -s EXPORTED_RUNTIME_METHODS="['ccall', 'cwrap']" \
    -s ENVIRONMENT=web \
    -s NO_EXIT_RUNTIME=1 