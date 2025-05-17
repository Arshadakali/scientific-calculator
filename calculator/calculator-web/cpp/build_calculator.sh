#!/bin/bash

# Set up EMSDK environment
source $HOME/emsdk/emsdk_env.sh

# Compile the calculator
emcc \
  calculator.cpp \
  -o calculator.js \
  -s WASM=1 \
  -s MODULARIZE=1 \
  -s EXPORT_NAME="createCalculatorModule" \
  -s EXPORTED_FUNCTIONS="['_malloc', '_free']" \
  -s EXTRA_EXPORTED_RUNTIME_METHODS="['cwrap', 'getValue', 'setValue']" \
  -s ENVIRONMENT="web" \
  -O3
