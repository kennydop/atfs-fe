"use client";
import { useState } from "react";
import Button from "@/app/components/Button";
import requests from "@/helpers/apiRequests";
import { validatePassword } from "@/validators/formValidator";

const ResetPasswordForm = ({ token }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { valid: validPassword, message: passwordMessage } =
      validatePassword(password);
    if (!validPassword) {
      setError(passwordMessage);
      return;
    }

    setLoading(true);
    try {
      // Call the API to reset the password
      const data = await requests.post(`/auth/reset-password?token=${token}`, {
        password,
      });

      setLoading(false);
      if (!data.success) {
        setError(data.message ?? "An error occurred. Please try again later.");
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
      <h1 className="text-lg text-center font-bold mb-4">Reset Password</h1>
      {success ? (
        <>
          <div
            className="text-center bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <p>
              <strong className="font-bold">Password Reset Successful</strong>
            </p>
            <p>
              Your password has been reset successfully. You can now sign in
              with your new password.
            </p>
          </div>
          <div className="mt-4">
            <a href="/signin">
              <Button loading={loading}>Sign In</Button>
            </a>
          </div>
        </>
      ) : (
        <>
          {error && (
            <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Create New Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="New Password"
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
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                min={6}
              />
            </div>
            <div className="mt-4">
              <Button loading={loading} type="submit">
                Reset Password
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ResetPasswordForm;
