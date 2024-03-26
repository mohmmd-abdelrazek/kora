"use client";
import { useState } from "react";
import { isAxiosError } from "axios";
import { axiosInstance } from "@/src/services/fetcher";
import useRedirectIfAuthenticated from "@/src/hooks/useRedirectIfAuthenticated";
import { SigninTextProps } from "@/src/types/textProps";

const SigninForm = (texts: SigninTextProps) => {
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
            setError(texts.error);
          }
        }
      };

  return (
    <form
        className="w-full max-w-md space-y-6 rounded-md bg-white sm:max-w-md sm:p-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-1 text-md font-bold text-gray-600 sm:text-sm"
          >
            {texts.email}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder={texts.emailPlaceholder}
            disabled={isLoading}
            required
            className="mt-1 block w-full rounded-lg border border-gray-500 bg-white px-4 py-1 text-md text-gray-700 shadow-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 placeholder:text-gray-400"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-1 text-md font-bold text-gray-600 sm:text-sm"
          >
            {texts.password}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder={texts.passwordPlaceholder}
            disabled={isLoading}
            required
            className="mt-1 block w-full rounded-lg border border-gray-500 bg-white px-4 py-1 text-md text-gray-700 shadow-sm transition duration-150 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 placeholder:text-gray-400"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 w-full rounded-md bg-blue-500 px-4 py-2 text-md font-bold text-white transition duration-150 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isLoading ? "cursor-not-allowed opacity-50" : "opacity-100"} sm:text-sm`}
        >
          {isLoading ? texts.signingIn : texts.signIn}
        </button>
        {error && (
          <p className="mt-2 text-center text-sm text-red-600 sm:text-sm">
            {error}
          </p>
        )}
      </form>
  )
}

export default SigninForm