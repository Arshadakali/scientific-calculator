#include<iostream>
#include <cmath>
#include <vector>

using namespace emscripten;

class Calculator {
public:
    // Basic operations
    double basicOperation(double a, double b, char op) {
        switch(op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b != 0 ? a / b : NAN;
            default: return NAN;
        }
    }

    double power(double base, double exponent) {
        return std::pow(base, exponent);
    }

    double squareRoot(double x) {
        return x >= 0 ? std::sqrt(x) : NAN;
    }

    double sin(double x) {
        return std::sin(x);
    }

    double cos(double x) {
        return std::cos(x);
    }

    double tan(double x) {
        return std::tan(x);
    }

    double log(double x) {
        return x > 0 ? std::log10(x) : NAN;
    }

    double ln(double x) {
        return x > 0 ? std::log(x) : NAN;
    }

    // Matrix operations
    struct Matrix {
        std::vector<std::vector<double>> data;

        int rows() const { return data.size(); }
        int cols() const { return data.empty() ? 0 : data[0].size(); }
    };

    Matrix addMatrices(const Matrix& m1, const Matrix& m2) {
        if (m1.rows() != m2.rows() || m1.cols() != m2.cols()) {
            throw std::runtime_error("Matrices must have the same dimensions for addition");
        }

        Matrix result;
        result.data.resize(m1.rows());
        for (int i = 0; i < m1.rows(); i++) {
            result.data[i].resize(m1.cols());
            for (int j = 0; j < m1.cols(); j++) {
                result.data[i][j] = m1.data[i][j] + m2.data[i][j];
            }
        }
        return result;
    }

    Matrix multiplyMatrices(const Matrix& m1, const Matrix& m2) {
        if (m1.cols() != m2.rows()) {
            throw std::runtime_error("Number of columns in first matrix must equal number of rows in second matrix");
        }

        Matrix result;
        result.data.resize(m1.rows());
        for (int i = 0; i < m1.rows(); i++) {
            result.data[i].resize(m2.cols());
            for (int j = 0; j < m2.cols(); j++) {
                double sum = 0;
                for (int k = 0; k < m1.cols(); k++) {
                    sum += m1.data[i][k] * m2.data[k][j];
                }
                result.data[i][j] = sum;
            }
        }
        return result;
    }

    Matrix transposeMatrix(const Matrix& m) {
        Matrix result;
        result.data.resize(m.cols());
        for (int i = 0; i < m.cols(); i++) {
            result.data[i].resize(m.rows());
            for (int j = 0; j < m.rows(); j++) {
                result.data[i][j] = m.data[j][i];
            }
        }
        return result;
    }

    double determinant(const Matrix& m) {
        if (m.rows() != m.cols()) {
            throw std::runtime_error("Matrix must be square for determinant calculation");
        }

        int n = m.rows();
        if (n == 1) return m.data[0][0];
        if (n == 2) return m.data[0][0] * m.data[1][1] - m.data[0][1] * m.data[1][0];

        double det = 0;
        for (int i = 0; i < n; i++) {
            Matrix submatrix;
            submatrix.data.resize(n-1);
            for (int j = 1; j < n; j++) {
                submatrix.data[j-1].resize(n-1);
                for (int k = 0, l = 0; k < n; k++) {
                    if (k != i) {
                        submatrix.data[j-1][l] = m.data[j][k];
                        l++;
                    }
                }
            }
            det += std::pow(-1, i) * m.data[0][i] * determinant(submatrix);
        }
        return det;
    }

    // Quadratic equation
    struct QuadraticResult {
        double root1;
        double root2;
        bool isComplex;
    };

    QuadraticResult solveQuadratic(double a, double b, double c) {
        QuadraticResult result;
        
        if (std::abs(a) < 1e-10) {
            if (std::abs(b) < 1e-10) {
                result.root1 = NAN;
                result.root2 = NAN;
                result.isComplex = false;
                return result;
            }
            result.root1 = -c / b;
            result.root2 = NAN;
            result.isComplex = false;
            return result;
        }

        double discriminant = b * b - 4 * a * c;
        
        if (discriminant > 0) {
            result.root1 = (-b + std::sqrt(discriminant)) / (2 * a);
            result.root2 = (-b - std::sqrt(discriminant)) / (2 * a);
            result.isComplex = false;
        } else if (discriminant == 0) {
            result.root1 = -b / (2 * a);
            result.root2 = NAN;
            result.isComplex = false;
        } else {
            result.root1 = -b / (2 * a);
            result.root2 = std::sqrt(-discriminant) / (2 * a);
            result.isComplex = true;
        }
        
        return result;
    }
};

EMSCRIPTEN_BINDINGS(calculator) {
    class_<Calculator>("Calculator")
        .constructor()
        .function("basicOperation", &Calculator::basicOperation)
        .function("solveQuadratic", &Calculator::solveQuadratic)
        .function("power", &Calculator::power)
        .function("squareRoot", &Calculator::squareRoot)
        .function("sin", &Calculator::sin)
        .function("cos", &Calculator::cos)
        .function("tan", &Calculator::tan)
        .function("log", &Calculator::log)
        .function("ln", &Calculator::ln)
        .function("addMatrices", &Calculator::addMatrices)
        .function("multiplyMatrices", &Calculator::multiplyMatrices)
        .function("transposeMatrix", &Calculator::transposeMatrix)
        .function("determinant", &Calculator::determinant);

    value_object<Calculator::QuadraticResult>("QuadraticResult")
        .field("root1", &Calculator::QuadraticResult::root1)
        .field("root2", &Calculator::QuadraticResult::root2)
        .field("isComplex", &Calculator::QuadraticResult::isComplex);

    value_object<Calculator::Matrix>("Matrix")
        .field("data", &Calculator::Matrix::data);
}