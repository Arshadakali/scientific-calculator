'use client';

import MatrixCalculator from '../components/MatrixCalculator';

export default function MatrixPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Matrix Calculator</h1>
      <div className="bg-white rounded-xl shadow-lg p-8">
        <MatrixCalculator />
      </div>
    </div>
  );
}
