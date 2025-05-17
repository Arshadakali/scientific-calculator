import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { operation, ...params } = body;

    switch (operation) {
      case 'basic':
        return handleBasicOperation(params);
      case 'matrix':
        return handleMatrixOperation(params);
      case 'factorial':
        return handleFactorial(params);
      case 'exponent':
        return handleExponent(params);
      case 'logarithm':
        return handleLogarithm(params);
      case 'trigonometry':
        return handleTrigonometry(params);
      case 'inverseTrigonometry':
        return handleInverseTrigonometry(params);
      case 'pythagorean':
        return handlePythagorean(params);
      default:
        return NextResponse.json(
          { error: 'Invalid operation' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Calculation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

function handleBasicOperation({ a, b, operator }: { a: number; b: number; operator: string }) {
  let result: number;
  switch (operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      result = b === 0 ? Infinity : a / b;
      break;
    default:
      result = a + b; // Default to addition
  }
  return NextResponse.json({ result: Number(result.toFixed(10)) });
}

function handleLinearEquation({ a, b }: { a: number; b: number }) {
  const x = a === 0 ? Infinity : -b / a;
  return NextResponse.json({ x: Number(x.toFixed(10)) });
}

function handleQuadraticEquation({ a, b, c }: { a: number; b: number; c: number }) {
  if (a === 0) {
    // If a is 0, treat as linear equation
    const x = b === 0 ? Infinity : -c / b;
    return NextResponse.json({ x1: x, x2: x });
  }
  
  const discriminant = b * b - 4 * a * c;
  
  if (discriminant < 0) {
    const realPart = -b / (2 * a);
    const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
    return NextResponse.json({
      x1: `${Number(realPart.toFixed(10))} + ${Number(imaginaryPart.toFixed(10))}i`,
      x2: `${Number(realPart.toFixed(10))} - ${Number(imaginaryPart.toFixed(10))}i`
    });
  }
  
  const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
  const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
  return NextResponse.json({ 
    x1: Number(x1.toFixed(10)), 
    x2: Number(x2.toFixed(10)) 
  });
}

function handleMatrixOperation({ operation, matrix1, matrix2 }: { operation: string, matrix1: number[][], matrix2: number[][] }) {
  try {
    // Validate matrix dimensions
    if (matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length) {
      throw new Error('Matrices must have the same dimensions');
    }

    let result: number[][];
    if (operation === 'add') {
      result = matrix1.map((row, i) => 
        row.map((val, j) => val + matrix2[i][j])
      );
    } else if (operation === 'multiply') {
      // Matrix multiplication requires validation of dimensions
      if (matrix1[0].length !== matrix2.length) {
        throw new Error('Number of columns in first matrix must equal number of rows in second matrix');
      }
      
      result = matrix1.map((row) => 
        matrix2[0].map((_, j) => 
          row.reduce((sum, val, i) => sum + val * matrix2[i][j], 0)
        )
      );
    } else {
      throw new Error('Invalid matrix operation');
    }

    return NextResponse.json({ result });
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Matrix operation failed');
  }
}

function handleFactorial({ n }: { n: number }) {
  if (n < 0 || !Number.isInteger(n)) {
    return NextResponse.json({ result: 1 }); // Return 1 for invalid inputs
  }
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return NextResponse.json({ result });
}

function handleExponent({ base, exponent }: { base: number; exponent: number }) {
  const result = Math.pow(base, exponent);
  return NextResponse.json({ result: Number(result.toFixed(10)) });
}

function handleLogarithm({ value, base }: { value: number; base: number }) {
  // Ensure valid inputs
  if (value <= 0 || base <= 0 || base === 1) {
    return NextResponse.json({ result: 0 });
  }
  
  // Calculate logarithm using natural logarithm
  const result = Math.log(value) / Math.log(base);
  
  // Return result with 4 decimal places for better readability
  return NextResponse.json({ result: Number(result.toFixed(4)) });
}

function handleTrigonometry({ angle, function: trigFunction }: { angle: number; function: string }) {
  const radians = angle * Math.PI / 180;
  let result: number;
  
  switch (trigFunction) {
    case 'sin':
      result = Math.sin(radians);
      break;
    case 'cos':
      result = Math.cos(radians);
      break;
    case 'tan':
      result = Math.tan(radians);
      break;
    default:
      result = Math.sin(radians); // Default to sine
  }
  
  return NextResponse.json({ result: Number(result.toFixed(10)) });
}

function handleInverseTrigonometry({ value, function: trigFunction }: { value: number; function: string }) {
  if (value < -1 || value > 1) {
    return NextResponse.json({ result: 0 }); // Return 0 for invalid inputs
  }
  
  let result: number;
  switch (trigFunction) {
    case 'asin':
      result = Math.asin(value) * 180 / Math.PI;
      break;
    case 'acos':
      result = Math.acos(value) * 180 / Math.PI;
      break;
    case 'atan':
      result = Math.atan(value) * 180 / Math.PI;
      break;
    default:
      result = Math.asin(value) * 180 / Math.PI; // Default to arcsine
  }
  
  return NextResponse.json({ result: Number(result.toFixed(10)) });
}

function handlePythagorean({ a, b, c }: { a?: number; b?: number; c?: number }) {
  // Validate inputs
  if (a !== undefined && a < 0) {
    return NextResponse.json(
      { error: 'Lengths must be positive numbers' },
      { status: 400 }
    );
  }
  if (b !== undefined && b < 0) {
    return NextResponse.json(
      { error: 'Lengths must be positive numbers' },
      { status: 400 }
    );
  }
  if (c !== undefined && c < 0) {
    return NextResponse.json(
      { error: 'Lengths must be positive numbers' },
      { status: 400 }
    );
  }

  // Calculate based on available inputs
  if (a !== undefined && b !== undefined) {
    return NextResponse.json({ c: Number(Math.sqrt(a * a + b * b).toFixed(10)) });
  } else if (a !== undefined && c !== undefined) {
    if (c <= a) {
      return NextResponse.json(
        { error: 'Hypotenuse must be longer than the leg' },
        { status: 400 }
      );
    }
    return NextResponse.json({ b: Number(Math.sqrt(c * c - a * a).toFixed(10)) });
  } else if (b !== undefined && c !== undefined) {
    if (c <= b) {
      return NextResponse.json(
        { error: 'Hypotenuse must be longer than the leg' },
        { status: 400 }
      );
    }
    return NextResponse.json({ a: Number(Math.sqrt(c * c - b * b).toFixed(10)) });
  }

  return NextResponse.json(
    { error: 'Invalid input: Need at least two sides to calculate' },
    { status: 400 }
  );
} 