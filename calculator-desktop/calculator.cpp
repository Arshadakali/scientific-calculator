#include <iostream> // Standard input/output stream
#include <fstream>
#include <cmath>
#include <algorithm> // For max function
#include <limits> // For numeric_limits

using namespace std;
#define PI 3.14159265358979323846

// Class for Algebraic Calculations
class AlgebraCalculator {
private:
    double a, b;
    char op;

public:
    // Constructor
    AlgebraCalculator(double a = 0, double b = 0, char op = '+') : a(a), b(b), op(op) {}

    // Static method for basic operations
    static double basicOperations(double a, double b, char op) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': 
                if (b != 0) return a / b;
                throw invalid_argument("Division by zero");
            case '^': return pow(a, b);
            default: throw invalid_argument("Invalid operator");
        }
    }

    // Solve linear equation ax + b = 0
    void solveLinearEquation() {
        cout << "Enter coefficient a: ";
        cin >> a;
        cout << "Enter coefficient b: ";
        cin >> b;

        if (a == 0 && b == 0) {
            cout << "Infinite solutions exist. Any value of x satisfies the equation." << endl;
        } else if (a == 0) {
            cout << "No solution exists." << endl;
        } else {
            double x = -b / a;
            cout << "Solution: x = " << x << endl;
        }
    }

    // Solve quadratic equation ax^2 + bx + c = 0
    void solveQuadraticEquation() {
        cout << "Enter coefficient a: ";
        cin >> a;
        cout << "Enter coefficient b: ";
        cin >> b;
        double c;
        cout << "Enter coefficient c: ";
        cin >> c;

        if (a == 0) {
            cout << "This is not a quadratic equation. Solving as a linear equation..." << endl;
            solveLinearEquation();
            return;
        }

        double discriminant = b * b - 4 * a * c; // Correct formula
        if (discriminant > 0) {
            double root1 = (-b + sqrt(discriminant)) / (2 * a);
            double root2 = (-b - sqrt(discriminant)) / (2 * a);
            cout << "Roots are real and different: " << root1 << " and " << root2 << endl;
        } else if (discriminant == 0) {
            double root = -b / (2 * a);
            cout << "Roots are real and same: " << root << endl;
        } else {
            double realPart = -b / (2 * a);
            double imaginaryPart = sqrt(-discriminant) / (2 * a);
            cout << "Roots are complex and different: " << realPart << " + " << imaginaryPart << "i and " << realPart << " - " << imaginaryPart << "i" << endl;
        }
    }

    // Calculate factorial
    void calculateFactorial() {
        cout << "Enter a number to calculate its factorial: ";
        cin >> a;

        if (a < 0) {
            cout << "Factorial is not defined for negative numbers." << endl;
            return;
        }

        double result = 1;
        for (int i = 1; i <= a; ++i) {
            result *= i;
        }
        cout << "Factorial: " << result << endl;
    }

    // Calculate exponentiation
    void calculateExponent() {
        clearInputStream(); // Clear input stream before taking input
        cout << "Enter base (a): ";
        cin >> a;
        cout << "Enter exponent (b): ";
        cin >> b;
        cout << "Exponentiation result: " << pow(a, b) << endl;
    }

    // Calculate logarithm
    void calculateLogarithm() {
        clearInputStream(); // Clear input stream before taking input
        cout << "Enter number (a) for logarithm: ";
        cin >> a;
        if (a <= 0) {
            cout << "Logarithm is not defined for non-positive numbers." << endl;
            return;
        }
        cout << "Logarithm (base 10): " << log10(a) << endl;
    }

    // Calculate square root
    void calculateSquareRoot() {
        clearInputStream(); // Clear input stream before taking input
        cout << "Enter number (a) for square root: ";
        cin >> a;
        if (a < 0) {
            cout << "Square root is not defined for negative numbers." << endl;
            return;
        }
        cout << "Square root: " << sqrt(a) << endl;
    }

    // Operator overloading
    double operator+(const AlgebraCalculator& other) const {
        return this->a + other.a;
    }

    double operator-(const AlgebraCalculator& other) const {
        return this->a - other.a;
    }

    double operator*(const AlgebraCalculator& other) const {
        return this->a * other.a;
    }

    double operator/(const AlgebraCalculator& other) const {
        if (other.a == 0) throw invalid_argument("Division by zero");
        return this->a / other.a;
    }

    double operator^(const AlgebraCalculator& other) const {
        return pow(this->a, other.a);
    }

    // Method to display result
    void displayResult() const {
        cout << "Result: " << basicOperations(a, b, op) << endl;
    }

    void clearInputStream() {
        cin.clear();
        cin.ignore(numeric_limits<streamsize>::max(), '\n');
    }
};

// Class for Trigonometric Calculations
class TrigonometryCalculator {
public:
    void displayMenu() {
        cout << "Trigonometry Calculator:\n";
        cout << "1. Sine (sin)\n";
        cout << "2. Cosine (cos)\n";
        cout << "3. Tangent (tan)\n";
        cout << "4. Back to Main Menu\n";
    }

    void calculate() {
        int choice;
        double input, result;
        do {
            displayMenu();
            cin >> choice;
            if (choice >= 1 && choice <= 3) {
                cout << "Enter angle in degrees (0 to 360): ";
                cin >> input;
                if (input >= 0 && input <= 360) {
                    if (choice == 1) result = sin(input * (PI / 180.0));
                    else if (choice == 2) result = cos(input * (PI / 180.0));
                    else if (choice == 3) {
                        if (input == 90 || input == 270) {
                            cout << "Result: Undefined (tan at 90°, 270°)" << endl;
                            continue;
                        }
                        result = tan(input * (PI / 180.0));
                    }
                    cout << "Result: " << result << endl;
                } else {
                    cout << "Invalid input! Angle must be between 0 and 360." << endl;
                }
            } else if (choice != 4) {
                cout << "Invalid choice! Try again.\n";
            }
        } while (choice != 4);
    }

    void calculateInverseTrig() {
        int choice;
        double input, result;
        cout << "Inverse Trigonometric Functions:\n";
        cout << "1. Arcsin (sin⁻¹)\n";
        cout << "2. Arccos (cos⁻¹)\n";
        cout << "3. Arctan (tan⁻¹)\n";
        cout << "Choose an option: ";
        cin >> choice;
        
        cout << "Enter value (-1 to 1 for arcsin/arccos): ";
        cin >> input;
        
        if (choice == 1) {
            if (input < -1 || input > 1) {
                cout << "Error: Input must be between -1 and 1 for arcsin." << endl;
                return;
            }
            result = asin(input) * (180.0 / PI);
        } else if (choice == 2) {
            if (input < -1 || input > 1) {
                cout << "Error: Input must be between -1 and 1 for arccos." << endl;
                return;
            }
            result = acos(input) * (180.0 / PI);
        } else if (choice == 3) {
            result = atan(input) * (180.0 / PI);
        } else {
            cout << "Invalid choice!" << endl;
            return;
        }
        cout << "Result: " << result << " degrees" << endl;
    }

    void calculatePythagoreanTheorem() {
        double a, b, c;
        int choice;
        cout << "Pythagorean Theorem Calculator:\n";
        cout << "1. Find hypotenuse\n";
        cout << "2. Find leg\n";
        cout << "Choose an option: ";
        cin >> choice;
        
        if (choice == 1) {
            cout << "Enter length of first leg: ";
            cin >> a;
            cout << "Enter length of second leg: ";
            cin >> b;
            c = sqrt(a*a + b*b);
            cout << "Hypotenuse = " << c << endl;
        } else if (choice == 2) {
            cout << "Enter length of hypotenuse: ";
            cin >> c;
            cout << "Enter length of known leg: ";
            cin >> a;
            b = sqrt(c*c - a*a);
            cout << "Unknown leg = " << b << endl;
        } else {
            cout << "Invalid choice!" << endl;
        }
    }
};

// Class for Right Triangle Calculations
class RightTriangle {
public:
    struct Triangle {
        double base, perpendicular, hypotenuse;
    };

    void calculateHypotenuse(Triangle* t) {
        t->hypotenuse = sqrt((t->base * t->base) + (t->perpendicular * t->perpendicular));
    }

    bool isRightAngledTriangle(const Triangle* t) {
        return (t->hypotenuse * t->hypotenuse) == (t->base * t->base) + (t->perpendicular * t->perpendicular);
    }

    double findLargestSide(const Triangle* t) {
        return max(t->base, max(t->perpendicular, t->hypotenuse));
    }

    void initializeTriangle(Triangle* t) {
        cout << "Enter base: ";
        cin >> t->base;
        cout << "Enter perpendicular: ";
        cin >> t->perpendicular;
        calculateHypotenuse(t);
    }

    void displayTriangle(const Triangle* t) {
        cout << "Triangle Data:\n";
        cout << "Base: " << t->base << "\n";
        cout << "Perpendicular: " << t->perpendicular << "\n";
        cout << "Hypotenuse: " << t->hypotenuse << "\n";
    }

    void saveTriangleToFile(const Triangle* t, const string& filename) {
        ofstream outFile(filename.c_str());
        if (!outFile) {
            cout << "Error opening file for writing.\n";
            return;
        }
        outFile << t->base << " " << t->perpendicular << " " << t->hypotenuse << endl;
        outFile.close();
        cout << "Triangle data saved successfully...\n";
    }

    void loadTrianglesFromFile(const string& filename) {
        ifstream inFile(filename.c_str());
        if (!inFile) {
            cout << "Error opening file for reading.\n";
            return;
        }
        cout << "Triangles in file:\n";
        double base, perp, hypotenuse;
        while (inFile >> base >> perp >> hypotenuse) {
            cout << "Base: " << base << ", Perpendicular: " << perp << ", Hypotenuse: " << hypotenuse << endl;
        }
        inFile.close();
    }

    void calculateArea(const Triangle* t) {
        double area = (t->base * t->perpendicular) / 2.0;
        cout << "Area of the triangle: " << area << endl;
    }

    void calculatePerimeter(const Triangle* t) {
        double perimeter = t->base + t->perpendicular + t->hypotenuse;
        cout << "Perimeter of the triangle: " << perimeter << endl;
    }

    
};

// Matrix Operations
class Matrix {
    private:
        int mat[10][10];
        int rows, cols;
    public:
        Matrix(int r, int c) : rows(r), cols(c) {}
        
        // Operator overloading for scalar multiplication
        Matrix operator*(double scalar) {
            Matrix result(rows, cols);
            for (int i = 0; i < rows; i++)
                for (int j = 0; j < cols; j++)
                    result.mat[i][j] = mat[i][j] * scalar;
            return result;
        }
        void input() {
            cout << "Enter elements:\n";
            for (int i = 0; i < rows; i++)
                for (int j = 0; j < cols; j++)
                    cin >> mat[i][j];
        }
        void display() const {
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < cols; j++)
                    cout << mat[i][j] << " ";
                cout << endl;
            }
        }
        Matrix add(const Matrix &other) {
            Matrix result(rows, cols);
            if (rows != other.rows || cols != other.cols) {
                cout << "Error: Matrix dimensions must match!\n";
                return result;
            }
            for (int i = 0; i < rows; i++)
                for (int j = 0; j < cols; j++)
                    result.mat[i][j] = mat[i][j] + other.mat[i][j];
            return result;
        }
        Matrix multiply(const Matrix &other) {
            Matrix result(rows, other.cols);
            if (cols != other.rows) {
                cout << "Error: Number of columns in first matrix must match number of rows in second matrix!\n";
                return result;
            }
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < other.cols; j++) {
                    result.mat[i][j] = 0;
                    for (int k = 0; k < cols; k++) {
                        result.mat[i][j] += mat[i][k] * other.mat[k][j];
                    }
                }
            }
            return result;
        }
        Matrix transpose() {
            Matrix result(cols, rows);
            for (int i = 0; i < rows; i++) {
                for (int j = 0; j < cols; j++) {
                    result.mat[j][i] = mat[i][j];
                }
            }
            return result;
        }
        int determinant() {
            if (rows != cols) {
                cout << "Error: Matrix must be square to calculate determinant!\n";
                return 0;
            }
            if (rows == 1) return mat[0][0];
            if (rows == 2) return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
            
            int det = 0;
            for (int i = 0; i < cols; i++) {
                Matrix submatrix(rows-1, cols-1);
                for (int r = 1; r < rows; r++) {
                    int col = 0;
                    for (int c = 0; c < cols; c++) {
                        if (c != i) {
                            submatrix.mat[r-1][col++] = mat[r][c];
                        }
                    }
                }
                det += (i % 2 == 0 ? 1 : -1) * mat[0][i] * submatrix.determinant();
            }
            return det;
        }

        Matrix inverse() {
            if (rows != cols) {
                cout << "Error: Matrix must be square to calculate inverse!\n";
                return Matrix(rows, cols);
            }
            int det = determinant();
            if (det == 0) {
                cout << "Error: Matrix is singular (determinant is zero)!\n";
                return Matrix(rows, cols);
            }
            Matrix adjugate(rows, cols);
            for (int i = 0; i < rows; i++)
                for (int j = 0; j < cols; j++) {
                    Matrix submatrix(rows - 1, cols - 1);
                    for (int r = 0, m = 0; r < rows; r++)
                        if (r != i)
                            for (int c = 0, n = 0; c < cols; c++)
                                if (c != j)
                                    submatrix.mat[m++][n++] = mat[r][c];
                    adjugate.mat[j][i] = pow(-1, i + j) * submatrix.determinant();
                }
            return adjugate * (1.0 / det);
        }
    };

// Main Menu
int main() {
    AlgebraCalculator algebra;
    TrigonometryCalculator trig;
    RightTriangle rt;
    RightTriangle::Triangle t;
    
    char choice;
    const string filename = "triangle_data.txt";

    do {
        cout << "\nScientific Calculator:\n";
        cout << "1. Algebra Calculator\n";
        cout << "2. Trigonometry Calculator\n";
        cout << "3. Right Triangle Calculator\n";
        cout << "4. Matrix Operations\n";
        cout << "5. Exit\n";
        cout << "Choose an option: ";
        
        cin >> choice;
        cin.ignore(numeric_limits<streamsize>::max(), '\n');  // Clear buffer after reading choice

        switch (choice) {
            case '1': {
                int algChoice;
                cout << "\nAlgebra Calculator:\n";
                cout << "1. Basic Operations (+, -, *, /, ^, sqrt(a))\n";
                cout << "2. Solve Linear Equation\n";
                cout << "3. Solve Quadratic Equation\n";
                cout << "4. Calculate Factorial\n";
                cout << "5. Calculate Exponent\n";
                cout << "6. Calculate Logarithm\n";
                cout << "7. Calculate Square Root\n";
                cout << "8. Back to Main Menu\n";
                cout << "Choose an option: ";
                cin >> algChoice;
                
                if (algChoice == 1) {
                    double a, b;
                    char op;
                    cout << "Enter first number: ";
                    cin >> a;
                    cout << "Enter operator (+, -, *, /, ^): ";
                    cin >> op;
                    cout << "Enter second number: ";
                    cin >> b;
                    cout << "Result: " << AlgebraCalculator::basicOperations(a, b, op) << endl;
                }
                else if (algChoice == 2) algebra.solveLinearEquation();
                else if (algChoice == 3) algebra.solveQuadraticEquation();
                else if (algChoice == 4) algebra.calculateFactorial();
                else if (algChoice == 5) algebra.calculateExponent();
                else if (algChoice == 6) algebra.calculateLogarithm();
                else if (algChoice == 7) algebra.calculateSquareRoot();
                cout << "\nReturning to main menu...\n";
                break;
            }
            case '2':
                trig.calculate();
                cout << "\nReturning to main menu...\n";
                break;
            case '3': {
                rt.initializeTriangle(&t);
                rt.displayTriangle(&t);
                cout << "Largest side: " << rt.findLargestSide(&t) << endl;
                if (rt.isRightAngledTriangle(&t))
                    cout << "The triangle is right-angled.\n";
                else
                    cout << "The triangle is not right-angled.\n";
                rt.saveTriangleToFile(&t, filename);
                rt.loadTrianglesFromFile(filename);
                rt.calculateArea(&t);
                rt.calculatePerimeter(&t);
                
                cout << "\nReturning to main menu...\n";
                break;
            }
            case '4': { // Matrix operations
                int r, c;
                cout << "Enter matrix size (rows cols): ";
                cin >> r >> c;
                Matrix A(r, c), B(r, c);
                cout << "Matrix A:\n"; A.input();
                cout << "Matrix B:\n"; B.input();
                Matrix sum = A.add(B);
                cout << "Sum:\n"; sum.display();
                Matrix product = A.multiply(B);
                cout << "Product:\n"; product.display();
                Matrix transposedA = A.transpose();
                cout << "Transposed Matrix A:\n"; transposedA.display();
                cout << "Determinant of A: " << A.determinant() << endl;
                cout << "\nReturning to main menu...\n";
                break;
            }
            case '5':
                cout << "Exiting program...\n";
                break;
            default:
                cout << "Invalid choice! Try again.\n";
        }
    } while (choice != '5');

    return 0;
}