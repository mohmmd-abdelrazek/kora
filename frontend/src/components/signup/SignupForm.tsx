"use client";

import InputField from "./InputField";
import { useState } from "react";
import { useRouter } from "@/src/navigation";
import { axiosInstance } from "@/src/services/fetcher";
import { isAxiosError } from "axios";
import { SignupTextProps } from "@/src/types/textProps";

const SignupForm = (texts: SignupTextProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [code, setCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupEnabled, setIsSignupEnabled] = useState(false);
  const router = useRouter();

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCode(e.target.value);

  const handleSendCode = async () => {
    try {
      let email = formData.email;
      await axiosInstance.post("/auth/send-verification-code", { email });
      setSuccessMessage("Verification code sent to your email.");
    } catch (error) {
      console.error("Error sending verification code:", error);
      setErrors(["Failed to send verification code."]);
    }
  };

  const handleVerifyCode = async () => {
    try {
      let email = formData.email;
      await axiosInstance.post("/auth/verify-code", { email, code });
      setIsSignupEnabled(true);
      setSuccessMessage("Code verified successfully!");
    } catch (error) {
      console.error("Error verifying code:", error);
      setErrors(["Failed to verify code."]);
    }
  };

  const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

  const validatePassword = (password: string): boolean =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  const validatePasswordMatch = (
    password: string,
    passwordConfirm: string,
  ): boolean => formData.password === formData.passwordConfirm;

  const validateForm = (): boolean => {
    const newErrors: string[] = [];
    if (!validateEmail(formData.email)) {
      newErrors.push("Invalid email format");
    }
    if (!validatePassword(formData.password)) {
      newErrors.push(
        "Password must be at least 8 characters long and include both letters and numbers",
      );
    }
    if (!validatePasswordMatch(formData.password, formData.passwordConfirm)) {
      newErrors.push("Password confirmation not match password");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccessMessage("");
    setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/auth/signup", formData);
      const logout = await axiosInstance.get("/auth/logout");
      setIsLoading(false);
      setSuccessMessage("Signup successful!");
      setErrors([]);
      setTimeout(() => {
        confirm(
          "Congratulations! you have signed up successfully, let's signin?",
        ) && router.push("/signin");
      }, 1000);
    } catch (error) {
      setIsLoading(false);
      if (isAxiosError(error)) {
        setErrors([error.response?.data?.error || texts.errorMessage]);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-5 bg-white">
      <div className="space-y-3">
        <InputField
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          isLoading={isLoading}
          label={texts.nameLabel}
        />
        <InputField
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          isLoading={isLoading}
          label={texts.emailLabel}
        />
        <InputField
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          isLoading={isLoading}
          label={texts.passwordLabel}
        />
        <InputField
          id="password-confirm"
          name="passwordConfirm"
          type="password"
          value={formData.passwordConfirm}
          onChange={handleChange}
          isLoading={isLoading}
          label={texts.confirmPasswordLabel}
        />
      </div>

      {/* <button
        type="button"
        onClick={handleSendCode}
        className="mt-4 inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Send Verification Code
      </button>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Verification Code"
          value={code}
          onChange={handleCodeChange}
          className="mt-1 w-full flex-1 rounded-lg border-gray-300 px-4 py-2 text-sm shadow-sm transition duration-150 ease-in-out focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        />
        <button
          type="button"
          onClick={handleVerifyCode}
          className="mt-4 inline-flex justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-150 ease-in-out hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 md:mt-0"
        >
          Verify Code
        </button>
      </div> */}

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-md font-medium text-white shadow-sm transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {isLoading ? texts.signingUp : texts.signUpButton}
      </button>

      {successMessage && (
        <p className="text-center text-sm font-medium text-green-600">
          {successMessage}
        </p>
      )}
      {errors &&
        errors.map((error, index) => (
          <p key={index} className="text-center text-sm text-red-600">
            {error}
          </p>
        ))}
    </form>
  );
};

export default SignupForm;
