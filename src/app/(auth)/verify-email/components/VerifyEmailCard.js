"use client";

import Button from "@/app/components/Button";
import { useEffect, useState } from "react";
import requests from "@/helpers/apiRequests";
import { useRouter } from "next/navigation";

function VerifyEmailCard({ error, token, success }) {
  const [_error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const router = useRouter();

  // 1 min count down timer to resend email
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // redirect to home page in 4 seconds
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        router.replace("/");
      }, 4000);
    }
  }, [success]);

  const handleResendEmail = async () => {
    setError(null);
    setLoading(true);

    try {
      await requests.get(
        `/auth/send-verification-email${token ? `?token=${token}` : ""}`
      );
      setTimer(60);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      router.replace(`/verify-email${token ? `?token=${token}` : ""}`);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg border border-gray-300">
      <h1 className="text-lg text-center font-bold mb-4">Verify Email</h1>
      {_error && <p className="text-red-500 text-center mb-4">{_error}</p>}
      {error ? (
        <div
          className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <p>
            <strong className="font-bold">{errors[error].title}</strong>
          </p>
          <p>{errors[error].message}</p>
        </div>
      ) : success ? (
        <div
          className="text-center bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <p>
            <strong className="font-bold">Email Verified</strong>
          </p>
          <p>
            Your email has been verified. You will be redirected to the home
            page shortly.
          </p>
        </div>
      ) : (
        <>
          <p className="text-center mb-2">
            A verification email has been sent to your email address.
          </p>
          <p className="text-center mb-4">
            Please verify your email address to complete the registration
            process.
          </p>
        </>
      )}
      {!success && (
        <div className="flex justify-center">
          <Button
            loading={loading}
            onClick={handleResendEmail}
            disabled={timer > 0}
          >
            {" "}
            Resend Email {timer > 0 && `(${timer})`}
          </Button>
        </div>
      )}
    </div>
  );
}

export default VerifyEmailCard;

const errors = {
  1: {
    title: "Invalid Link",
    message: "The link is invalid.",
  },
  2: {
    title: "Link Already Used",
    message: "This link has already been used.",
  },
  3: {
    title: "Expired Link",
    message: "The link has expired.",
  },
  4: {
    title: "Already Verified",
    message: "Your email is already verified.",
  },
};
