"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    // Demo: Accept any non-empty email/password
    if (email && password) {
      localStorage.setItem("auth", "1");
      router.push("/");
    } else {
      setError("Please enter email and password.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSignup}>
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-6 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign Up</button>
        <div className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
}
