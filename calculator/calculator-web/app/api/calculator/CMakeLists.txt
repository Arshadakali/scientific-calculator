cmake_minimum_required(VERSION 3.13)

# Set the project name
project(calculator)

# Set the C++ standard
set(CMAKE_CXX_STANDARD 17)

# Find the Emscripten compiler
find_program(EMCC emcc)
if(NOT EMCC)
    message(FATAL_ERROR "Emscripten compiler not found")
endif()

# Add the calculator source file
add_executable(calculator WASM
    ../../../../../calculator.cpp
)

# Set Emscripten flags
set_target_properties(calculator PROPERTIES
    LINK_FLAGS "-s WASM=1 -s EXPORTED_FUNCTIONS=\"['_addMatrices', '_multiplyMatrices']\" -s EXPORTED_RUNTIME_METHODS=\"[\"cwrap\"]\""
)

# Add include directories
include_directories(../../../../../)

# Create the WebAssembly module
add_custom_command(
    TARGET calculator POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_if_different
    $<TARGET_FILE:calculator>
    ${CMAKE_CURRENT_SOURCE_DIR}/calculator.wasm
)

# Create the JavaScript glue code
add_custom_command(
    TARGET calculator POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_if_different
    $<TARGET_FILE:calculator.js>
    ${CMAKE_CURRENT_SOURCE_DIR}/calculator.js
)
