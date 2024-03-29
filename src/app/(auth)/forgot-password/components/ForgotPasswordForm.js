"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import requests from "@/helpers/apiRequests";

const ForgotPasswordForm = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    setLoading(true);
    try {
      // Call the API to request a password reset
      const data = await requests.post("/auth/forgot-password", {
        email,
      });

      setLoading(false);

      if (!data.success) {
        setError(data.message);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg border border-gray-300">
      <h1 className="text-lg text-center font-bold mb-4">Forgot Password</h1>
      {success ? (
        <div
          className="text-center bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <p>
            <strong className="font-bold">Password Reset Email Sent</strong>
          </p>
          <p>
            We have sent you an email with instructions on how to reset your
            password.
          </p>
        </div>
      ) : (
        <>
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
            <div className="mt-4">
              <Button loading={loading} type="submit">
                Confirm
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ForgotPasswordForm;
