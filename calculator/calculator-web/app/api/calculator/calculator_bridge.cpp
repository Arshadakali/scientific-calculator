#include <node.h>
#include <nan.h>
#include "../../../calculator.cpp"

using namespace v8;

NAN_METHOD(AddMatrices) {
    if (info.Length() < 2) {
        Nan::ThrowTypeError("Requires two matrices");
        return;
    }

    // Get matrices from arguments
    Local<Array> matrix1 = info[0].As<Array>();
    Local<Array> matrix2 = info[1].As<Array>();

    // Convert to C++ matrices
    Matrix m1(matrix1->Length(), matrix1->Length());
    Matrix m2(matrix2->Length(), matrix2->Length());

    for (uint32_t i = 0; i < matrix1->Length(); i++) {
        Local<Array> row1 = matrix1->Get(i).As<Array>();
        Local<Array> row2 = matrix2->Get(i).As<Array>();
        for (uint32_t j = 0; j < row1->Length(); j++) {
            m1.setValue(i, j, row1->Get(j).As<Number>()->Value());
            m2.setValue(i, j, row2->Get(j).As<Number>()->Value());
        }
    }

    // Perform calculation
    Matrix result = m1 + m2;

    // Convert result back to JavaScript array
    Local<Array> resultArray = Nan::New<Array>(result.getRows());
    for (uint32_t i = 0; i < result.getRows(); i++) {
        Local<Array> row = Nan::New<Array>(result.getCols());
        for (uint32_t j = 0; j < result.getCols(); j++) {
            row->Set(j, Nan::New(result.getValue(i, j)));
        }
        resultArray->Set(i, row);
    }

    info.GetReturnValue().Set(resultArray);
}

NAN_METHOD(MultiplyMatrices) {
    if (info.Length() < 2) {
        Nan::ThrowTypeError("Requires two matrices");
        return;
    }

    // Similar implementation as AddMatrices
    // ...
}

void Initialize(Local<Object> exports) {
    NODE_SET_METHOD(exports, "addMatrices", AddMatrices);
    NODE_SET_METHOD(exports, "multiplyMatrices", MultiplyMatrices);
}

NODE_MODULE(cpp_calculator, Initialize)
