const cppCalculator = require('./build/Release/cpp_calculator');

module.exports = {
    addMatrices: function(matrix1, matrix2) {
        return cppCalculator.addMatrices(matrix1, matrix2);
    },
    multiplyMatrices: function(matrix1, matrix2) {
        return cppCalculator.multiplyMatrices(matrix1, matrix2);
    }
};
