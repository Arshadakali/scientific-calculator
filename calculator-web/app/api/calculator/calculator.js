export const calculate = async (operation, params) => {
  try {
    switch (operation) {
      case 'matrix':
        if (params.operation === 'add') {
          return addMatrices(params.matrix1, params.matrix2);
        } else if (params.operation === 'multiply') {
          return multiplyMatrices(params.matrix1, params.matrix2);
        }
        break;
      default:
        throw new Error('Unsupported operation');
    }
  } catch (error) {
    console.error('Calculation error:', error);
    throw error;
  }
};

// Simple matrix addition
const addMatrices = (matrix1, matrix2) => {
  const result = [];
  for (let i = 0; i < matrix1.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrix1[i].length; j++) {
      result[i][j] = matrix1[i][j] + matrix2[i][j];
    }
  }
  return result;
};

// Simple matrix multiplication
const multiplyMatrices = (matrix1, matrix2) => {
  const result = [];
  for (let i = 0; i < matrix1.length; i++) {
    result[i] = [];
    for (let j = 0; j < matrix2[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrix1[0].length; k++) {
        sum += matrix1[i][k] * matrix2[k][j];
      }
      result[i][j] = sum;
    }
  }
  return result;
};
