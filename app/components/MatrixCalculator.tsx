"use client";

import React, { useEffect } from "react";
import { useState } from "react";

type Operation = "add" | "multiply" | "transpose" | "determinant";

interface Matrix {
  data: number[][];
}

interface MatrixCalculatorProps {
  onResult?: (result: Matrix | number) => void;
}

const MatrixCalculator: React.FC<MatrixCalculatorProps> = ({ onResult }) => {
  const [matrix1, setMatrix1] = useState<Matrix>({
    data: [
      [1, 2],
      [3, 4],
    ],
  });
  const [matrix2, setMatrix2] = useState<Matrix>({
    data: [
      [5, 6],
      [7, 8],
    ],
  });
  const [operation, setOperation] = useState<Operation>("add");
  const [result, setResult] = useState<Matrix | null>(null);

  // Helper function to create a matrix with given dimensions
  const createMatrix = (rows: number, cols: number): number[][] => {
    return Array(rows)
      .fill(0)
      .map(() => Array(cols).fill(0));
  };

  // Helper function to check if matrix is square
  const isSquareMatrix = (matrix: Matrix): boolean => {
    return matrix.data.length === matrix.data[0].length;
  };

  const addMatrices = () => {
    if (
      matrix1.data.length !== matrix2.data.length ||
      matrix1.data[0].length !== matrix2.data[0].length
    ) {
      alert("Matrices must have the same dimensions for addition");
      return;
    }

    const resultMatrix: number[][] = matrix1.data.map((row, i) =>
      row.map((_, j) => matrix1.data[i][j] + matrix2.data[i][j])
    );

    const resultObj: Matrix = { data: resultMatrix };
    setResult(resultObj);
    if (onResult) {
      onResult(resultObj);
    }
  };

  const multiplyMatrices = () => {
    if (matrix1.data[0].length !== matrix2.data.length) {
      alert(
        "Number of columns in first matrix must equal number of rows in second matrix"
      );
      return;
    }

    const resultMatrix: number[][] = matrix1.data.map((row1, i) =>
      matrix2.data[0].map((_, j) =>
        row1.reduce(
          (sum, _, k) => sum + matrix1.data[i][k] * matrix2.data[k][j],
          0
        )
      )
    );

    const resultObj: Matrix = { data: resultMatrix };
    setResult(resultObj);
    if (onResult) {
      onResult(resultObj);
    }
  };

  const transposeMatrix = (matrix: Matrix): Matrix => {
    const rows = matrix.data.length;
    const cols = matrix.data[0].length;
    const resultMatrix = createMatrix(cols, rows);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        resultMatrix[j][i] = matrix.data[i][j];
      }
    }

    const resultObj: Matrix = { data: resultMatrix };
    setResult(resultObj);
    if (onResult) {
      onResult(resultObj);
    }
    return resultObj;
  };

  const calculateDeterminant = (matrix: Matrix): number => {
    if (!isSquareMatrix(matrix)) {
      alert("Matrix must be square for determinant calculation");
      return 0;
    }

    const n = matrix.data.length;
    if (n === 1) return matrix.data[0][0];
    if (n === 2)
      return (
        matrix.data[0][0] * matrix.data[1][1] -
        matrix.data[0][1] * matrix.data[1][0]
      );

    // Check for singular matrix
    const matrixData = matrix.data;
    for (let i = 0; i < n; i++) {
      let hasNonZero = false;
      for (let j = 0; j < n; j++) {
        if (matrixData[i][j] !== 0) {
          hasNonZero = true;
          break;
        }
      }
      if (!hasNonZero) {
        alert("Matrix is singular (has a row of zeros)");
        return 0;
      }
    }

    let det = 0;
    for (let i = 0; i < n; i++) {
      const submatrix = createMatrix(n - 1, n - 1);
      for (let j = 1; j < n; j++) {
        let col = 0;
        for (let k = 0; k < n; k++) {
          if (k !== i) {
            submatrix[j - 1][col] = matrix.data[j][k];
            col++;
          }
        }
      }
      det +=
        Math.pow(-1, i) *
        matrix.data[0][i] *
        calculateDeterminant({ data: submatrix });
    }

    setResult(null);
    if (onResult) {
      onResult(det);
    }
    return det;
  };

  // Reset result when operation changes
  useEffect(() => {
    setResult(null);
  }, [operation]);

  const handleMatrixInput = (
    matrix: "matrix1" | "matrix2",
    row: number,
    col: number,
    value: string
  ) => {
    const currentMatrix = matrix === "matrix1" ? matrix1 : matrix2;
    const newData = [...currentMatrix.data];
    const parsedValue = parseFloat(value);

    if (isNaN(parsedValue)) {
      alert("Please enter a valid number");
      return;
    }

    newData[row][col] = parsedValue;

    if (matrix === "matrix1") {
      setMatrix1({ data: newData });
    } else {
      setMatrix2({ data: newData });
    }
  };

  const handleOperation = () => {
    switch (operation) {
      case "add":
        addMatrices();
        break;
      case "multiply":
        multiplyMatrices();
        break;
      case "transpose":
        const transposed = transposeMatrix(matrix1);
        setResult(transposed);
        if (onResult) {
          onResult(transposed);
        }
        break;
      case "determinant":
        const det = calculateDeterminant(matrix1);
        if (onResult) {
          onResult(det);
        }
        break;
      default:
        alert("Invalid operation");
    }
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl">
      <h2 className="mb-8 text-2xl font-bold text-gray-800">
        Matrix Calculator
      </h2>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="p-6 border rounded-lg">
          <h3 className="mb-4 text-lg font-medium text-gray-700">Matrix 1</h3>
          <div className="space-y-4">
            {matrix1.data.map((row, i) => (
              <div key={`row-${i}`} className="flex gap-4">
                {row.map((cell, j) => (
                  <input
                    key={`cell-${i}-${j}`}
                    type="number"
                    value={cell}
                    onChange={(e) =>
                      handleMatrixInput("matrix1", i, j, e.target.value)
                    }
                    className="w-16 px-2 py-1 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="mb-4 text-lg font-medium text-gray-700">Matrix 2</h3>
          <div className="space-y-4">
            {matrix2.data.map((row, i) => (
              <div key={`row-${i}`} className="flex gap-4">
                {row.map((cell, j) => (
                  <input
                    key={`cell-${i}-${j}`}
                    type="number"
                    value={cell}
                    onChange={(e) =>
                      handleMatrixInput("matrix2", i, j, e.target.value)
                    }
                    className="w-16 px-2 py-1 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Operation
        </label>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value as Operation)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="add">Addition (+)</option>
          <option value="multiply">Multiplication (×)</option>
          <option value="transpose">Transpose</option>
          <option value="determinant">Determinant</option>
        </select>
      </div>

      <button
        onClick={handleOperation}
        className="w-full px-4 py-3 font-semibold text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
        disabled={!matrix1.data[0] || !matrix2.data[0]}
      >
        Calculate
      </button>

      {result && (
        <div className="p-6 mt-8 border-l-4 border-blue-500 rounded-r-lg bg-blue-50">
          <h3 className="mb-4 text-lg font-semibold text-blue-700">
            Result Matrix
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {result.data.map((row, i) => (
              <div key={`result-row-${i}`} className="flex gap-4">
                {row.map((cell, j) => (
                  <div
                    key={`cell-${i}-${j}`}
                    className="w-24 p-2 font-medium text-center text-gray-800 bg-gray-100 border rounded-lg"
                  >
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatrixCalculator;
