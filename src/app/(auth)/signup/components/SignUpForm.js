"use client";

import { useState } from "react";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "@/validators/formValidator";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";

const SignUpForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate name
    const { valid: validName, message: nameMessage } = validateName(name);
    if (!validName) {
      setError(nameMessage);
      return;
    }

    // Validate email
    const { valid: validEmail, message: emailMessage } = validateEmail(email);
    if (!validEmail) {
      setError(emailMessage);
      return;
    }

    // Validate password
    const { valid: validPassword, message: passwordMessage } =
      validatePassword(password);
    if (!validPassword) {
      setError(passwordMessage);
      return;
    }

    setLoading(true);
    try {
      // Call the API to sign up the user
      const response = await fetch("http://localhost:5000/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email,
          password,
        }),
      });

      const data = await response.json();

      setLoading(false);

      if (!response.ok) {
        setError(data.message ?? "An error occurred. Please try again later.");
        return;
      }

      if (!data.success) {
        // Redirect the user to the home page
        router.replace("/verify-email");
        return;
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg border border-gray-300">
      <h1 className="text-lg text-center font-bold mb-4">Sign Up</h1>
      {error && (
        <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            min={2}
          />
        </div>
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
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            min={6}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-600">
            By signing up, you agree to our{" "}
            <a href="#" className="text-primary">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-primary">
              Sign in
            </a>
            .
          </p>
        </div>
        <div className="mt-4">
          <Button
            loading={loading}
            type="submit"
            className="w-full px-4 py-2 bg-primary text-white rounded-md shadow-sm hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
