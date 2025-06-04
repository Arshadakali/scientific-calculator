"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    // Demo: Save user data locally (not secure, for demo purposes only)
    localStorage.setItem("auth", "1");
    router.push("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="w-full max-w-md p-8 bg-white rounded shadow-md"
        onSubmit={handleSignup}
      >
        <h2 className="mb-6 text-2xl font-bold text-center">Sign Up</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 mb-6 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Sign Up
        </button>
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
}
