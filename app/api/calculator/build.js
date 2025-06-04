const { exec } = require('child_process');

async function build() {
    try {
        // Compile C++ to WebAssembly
        const command = 'emcc "../../../calculator.cpp" -s WASM=1 -s EXPORTED_FUNCTIONS=\"[\"_addMatrices\", \"_multiplyMatrices\"]\" -s EXPORTED_RUNTIME_METHODS=\"[\"cwrap\"]\" -o calculator.js';
        
        await new Promise((resolve, reject) => {
            exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error: ${error}`);
                    reject(error);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                resolve();
            });
        });

        console.log('Build completed successfully!');
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

build();
