"use client";

import { useState } from "react";

export default function ScientificCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [operator, setOperator] = useState("");
  const [result, setResult] = useState("");
  const [operationType, setOperationType] = useState("basic");

  const handleCalculate = () => {
    try {
      // Reset result first
      setResult("");

      // Parse numbers
      const numA = parseFloat(a);
      const numB = parseFloat(b);
      const numC = parseFloat(c);

      // Validate inputs based on operation type
      if (operationType === "basic") {
        if (isNaN(numA) || isNaN(numB) || !operator) {
          setResult("Please enter valid numbers and select an operator");
          return;
        }
      } else if (operationType === "quadratic") {
        if (isNaN(numA) || isNaN(numB) || isNaN(numC)) {
          setResult("Please enter all coefficients for quadratic equation");
          return;
        }
      } else if (operationType === "trigonometry") {
        if (isNaN(numA) || !operator) {
          setResult(
            "Please enter an angle and select a trigonometric function"
          );
          return;
        }
      } else if (operationType === "logarithm") {
        if (isNaN(numA) || isNaN(numB)) {
          setResult("Please enter valid numbers for logarithm");
          return;
        }
      } else if (operationType === "linear") {
        if (isNaN(numA) || isNaN(numB)) {
          setResult("Please enter valid coefficients for linear equation");
          return;
        }
      } else if (operationType === "factorial") {
        if (isNaN(numA) || numA < 0 || !Number.isInteger(numA)) {
          setResult("Please enter a non-negative integer for factorial");
          return;
        }
      }

      // Perform calculation
      let resultValue;

      switch (operationType) {
        case "basic":
          resultValue = calculateBasic(numA, numB, operator);
          break;
        case "quadratic":
          resultValue = calculateQuadratic(numA, numB, numC);
          break;
        case "trigonometry":
          resultValue = calculateTrigonometry(numA, operator);
          break;
        case "logarithm":
          resultValue = calculateLogarithm(numA, numB);
          break;
        case "linear":
          resultValue = solveLinearEquation(numA, numB);
          break;
        case "factorial":
          resultValue = calculateFactorial(numA);
          break;
        case "exponent":
          resultValue = Math.pow(numA, numB);
          break;
        case "rightTriangle":
          resultValue = calculateRightTriangle(numA, numB);
          break;
        default:
          throw new Error("Invalid operation type");
      }

      // Format and display result
      if (typeof resultValue === "number") {
        setResult(resultValue.toFixed(4));
      } else {
        setResult(resultValue);
      }
    } catch (error) {
      if (error instanceof Error) {
        setResult(error.message);
      } else {
        setResult("An unexpected error occurred");
      }
    }
  };

  const calculateBasic = (a: number, b: number, operator: string) => {
    if (isNaN(a) || isNaN(b)) {
      throw new Error("Invalid numbers for basic calculation");
    }

    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        if (b === 0) {
          throw new Error("Cannot divide by zero");
        }
        return a / b;
      case "^":
        if (b < 0 && a === 0) {
          throw new Error("Cannot raise zero to a negative power");
        }
        return Math.pow(a, b);
      case "√":
        if (a < 0) {
          throw new Error("Cannot calculate square root of a negative number");
        }
        return Math.sqrt(a);
      default:
        throw new Error("Invalid operator");
    }
  };

  const calculateQuadratic = (a: number, b: number, c: number) => {
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      throw new Error("Invalid coefficients for quadratic equation");
    }

    if (a === 0) {
      throw new Error("Coefficient a cannot be zero in quadratic equation");
    }

    const discriminant = b * b - 4 * a * c;
    const realPart = -b / (2 * a);
    const imaginaryPart = Math.sqrt(Math.abs(discriminant)) / (2 * a);

    if (discriminant > 0) {
      return `Two real roots: x1 = ${(realPart + imaginaryPart).toFixed(
        4
      )}, x2 = ${(realPart - imaginaryPart).toFixed(4)}`;
    } else if (discriminant === 0) {
      return `One real root: x = ${realPart.toFixed(4)}`;
    } else {
      return `Two complex roots: x1 = ${realPart.toFixed(
        4
      )} + ${imaginaryPart.toFixed(4)}i, x2 = ${realPart.toFixed(
        4
      )} - ${imaginaryPart.toFixed(4)}i`;
    }
  };

  const calculateTrigonometry = (value: number, operation: string) => {
    if (isNaN(value)) {
      throw new Error("Invalid angle for trigonometric calculation");
    }

    const rad = (value * Math.PI) / 180;
    switch (operation) {
      case "sin":
        return Math.sin(rad);
      case "cos":
        return Math.cos(rad);
      case "tan":
        if (value % 180 === 90) {
          throw new Error("Tangent is undefined for angles 90° and 270°");
        }
        return Math.tan(rad);
      case "asin":
        if (value < -1 || value > 1) {
          throw new Error("Input must be between -1 and 1 for arcsine");
        }
        return (Math.asin(value) * 180) / Math.PI;
      case "acos":
        if (value < -1 || value > 1) {
          throw new Error("Input must be between -1 and 1 for arccosine");
        }
        return (Math.acos(value) * 180) / Math.PI;
      case "atan":
        return (Math.atan(value) * 180) / Math.PI;
      default:
        throw new Error("Invalid trigonometric function");
    }
  };

  const calculateLogarithm = (value: number, base: number) => {
    if (isNaN(value) || isNaN(base)) {
      throw new Error("Invalid numbers for logarithm");
    }

    if (value <= 0) {
      throw new Error("Logarithm is undefined for non-positive numbers");
    }
    if (base <= 0 || base === 1) {
      throw new Error("Base must be positive and not equal to 1");
    }

    if (base === 10) {
      return Math.log10(value);
    } else if (base === Math.E) {
      return Math.log(value);
    } else {
      return Math.log(value) / Math.log(base);
    }
  };

  const solveLinearEquation = (a: number, b: number) => {
    if (a === 0) {
      return b === 0 ? "Infinite solutions" : "No solution";
    }
    return `x = ${(-b / a).toFixed(4)}`;
  };

  const calculateFactorial = (n: number) => {
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const calculateRightTriangle = (base: number, height: number) => {
    if (isNaN(base) || isNaN(height)) {
      throw new Error("Invalid numbers for right triangle calculation");
    }

    if (base <= 0 || height <= 0) {
      throw new Error("Base and height must be positive numbers");
    }

    const hypotenuse = Math.sqrt(base ** 2 + height ** 2);
    const area = (base * height) / 2;
    const perimeter = base + height + hypotenuse;

    const angleBaseHypotenuse = (Math.atan(height / base) * 180) / Math.PI;
    const angleHeightHypotenuse = (Math.atan(base / height) * 180) / Math.PI;

    const isRightAngled =
      Math.abs(angleBaseHypotenuse + angleHeightHypotenuse - 90) < 1e-6;

    return `Triangle Data:\nBase: ${base}, Perpendicular: ${height}, Hypotenuse: ${hypotenuse.toFixed(
      4
    )}\nLargest side: ${Math.max(base, height, hypotenuse).toFixed(
      4
    )}\nThe triangle is ${
      isRightAngled ? "right-angled" : "not right-angled"
    }.\nArea: ${area.toFixed(4)}, Perimeter: ${perimeter.toFixed(
      4
    )}\nAngles: Base-Hypotenuse: ${angleBaseHypotenuse.toFixed(
      2
    )}°, Height-Hypotenuse: ${angleHeightHypotenuse.toFixed(
      2
    )}°, Right Angle: 90°`;
  };

  return (
    <div className="w-full max-w-md p-8 mx-auto bg-white shadow-lg rounded-xl">
      <h1 className="mb-8 text-3xl font-bold text-center text-gray-800">
        Scientific Calculator
      </h1>

      <div className="space-y-8">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Operation Type
          </label>
          <select
            value={operationType}
            onChange={(e) => setOperationType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="basic">Basic Arithmetic</option>
            <option value="quadratic">Quadratic Equation</option>
            <option value="trigonometry">Trigonometry</option>
            <option value="logarithm">Logarithms</option>
            <option value="linear">Linear Equation</option>
            <option value="factorial">Factorial</option>
            <option value="exponent">Exponentiation</option>
            <option value="rightTriangle">Right Triangle</option>
          </select>
        </div>

        {operationType === "basic" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Number 1
                </label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter first number"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Number 2
                </label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter second number"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Operator
              </label>
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="+">Addition (+)</option>
                <option value="-">Subtraction (-)</option>
                <option value="*">Multiplication (×)</option>
                <option value="/">Division (÷)</option>
                <option value="^">Power (^)</option>
                <option value="√">Square Root (√)</option>
              </select>
            </div>
          </div>
        )}

        {operationType === "quadratic" && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  a:
                </label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Coefficient a"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  b:
                </label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Coefficient b"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  c:
                </label>
                <input
                  type="number"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Coefficient c"
                />
              </div>
            </div>
          </div>
        )}

        {operationType === "trigonometry" && (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Angle (degrees)
              </label>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter angle in degrees"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Function
              </label>
              <select
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="sin">Sine (sin)</option>
                <option value="cos">Cosine (cos)</option>
                <option value="tan">Tangent (tan)</option>
                <option value="asin">Arcsine (sin⁻¹)</option>
                <option value="acos">Arccosine (cos⁻¹)</option>
                <option value="atan">Arctangent (tan⁻¹)</option>
              </select>
            </div>
          </div>
        )}

        {operationType === "logarithm" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Value
                </label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter value"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Base
                </label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter base"
                />
              </div>
            </div>
          </div>
        )}

        {operationType === "linear" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Coefficient a
                </label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter coefficient a"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Coefficient b
                </label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter coefficient b"
                />
              </div>
            </div>
          </div>
        )}

        {operationType === "factorial" && (
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Number
              </label>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter a non-negative integer"
              />
            </div>
          </div>
        )}

        {operationType === "exponent" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Base
                </label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter base"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Exponent
                </label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter exponent"
                />
              </div>
            </div>
          </div>
        )}

        {operationType === "rightTriangle" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Base (b)
                </label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter base"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Height (h)
                </label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter height"
                />
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Calculate
        </button>

        {result && (
          <div className="p-4 mt-4 bg-gray-100 rounded">
            <p className="text-lg">{result}</p>
          </div>
        )}

        <div className="p-4 mt-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold">About</h2>
          <p className="mt-2 text-gray-700">
            This Scientific Calculator allows you to perform a variety of
            mathematical operations, including basic arithmetic, solving
            quadratic equations, trigonometric calculations, logarithms, linear
            equations, factorials, exponentiation, and right triangle
            calculations. Select the desired operation type, input the required
            values, and click "Calculate" to see the result.
          </p>
          <p className="mt-2 text-gray-700">
            This application uses a backend built with Node.js and Express.js to
            handle complex calculations and data management. If no backend is
            used, all calculations are performed directly in the browser using
            JavaScript.
          </p>
        </div>
      </div>
    </div>
  );
}
