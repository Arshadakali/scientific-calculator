"use client";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Welcome to Advanced Calculator</h1>
        <p className="text-xl text-gray-600 mb-12">
          Choose the type of calculator you need:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Scientific Calculator</h2>
            <p className="text-gray-600 mb-6">
              Perform advanced mathematical operations including trigonometry, logarithms, and more.
            </p>
            <a
              href="/scientific"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Try Scientific Calculator
            </a>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Matrix Calculator</h2>
            <p className="text-gray-600 mb-6">
              Perform matrix operations including addition, multiplication, transpose, and determinant calculations.
            </p>
            <a
              href="/matrix"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Try Matrix Calculator
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
