"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import requests from "@/helpers/apiRequests";

const SignInForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    setLoading(true);
    try {
      // Call the API to sign in the user
      const data = await requests.post("/auth/login", {
        email,
        password,
      });

      if (!data.success) {
        setLoading(false);
        setError(data.message ?? "An error occurred. Please try again later.");
        return;
      } else {
        // Redirect the user to the home page
        router.replace("/");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg border border-gray-300">
      <h1 className="text-lg text-center font-bold mb-4">Sign In</h1>
      {error && (
        <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <a href="/forgot-password" className="text-primary text-sm">
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Not on ATFS?{" "}
            <a href="/signup" className="text-primary">
              Sign up
            </a>
            .
          </p>
        </div>
        <div className="mt-4">
          <Button loading={loading} type="submit">
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
