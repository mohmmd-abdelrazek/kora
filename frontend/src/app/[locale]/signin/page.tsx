"use client";
import useRedirectIfAuthenticated from "@/src/hooks/useRedirectIfAuthenticated";
import { useState } from "react";
import { isAxiosError } from "axios";
import { axiosInstance } from "@/src/services/fetcher";

function Signin() {
  useRedirectIfAuthenticated("/");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      setIsLoading(false);
      window.location.href = "/";
    } catch (error) {
      setIsLoading(false);
      if (isAxiosError(error)) {
        console.log(error.response?.data);
        setError(error.response?.data.message || "Failed to sign in");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-100 py-2 responsive-container">
      <form
        className="w-full max-w-sm space-y-6 rounded-md bg-white p-6 shadow-md sm:max-w-md sm:p-8"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-xl font-semibold text-gray-800 sm:text-2xl">
          Sign In
        </h2>
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-1 text-sm font-medium text-gray-600 sm:text-sm"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="block w-full rounded-md border-gray-300 px-4 py-2 text-sm text-gray-700 shadow-sm transition duration-150 ease-in-out focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-1 text-sm font-medium text-gray-600 sm:text-sm"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="block w-full rounded-md border-gray-300 px-4 py-2 text-sm text-gray-700 shadow-sm transition duration-150 ease-in-out focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isLoading ? "cursor-not-allowed opacity-50" : "opacity-100"} sm:text-sm`}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        {error && (
          <p className="mt-2 text-center text-sm text-red-600 sm:text-sm">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}

export default Signin;
