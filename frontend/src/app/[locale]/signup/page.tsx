"use client";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "@/src/navigation";
import { axiosInstance } from "@/src/services/fetcher";
import SignupForm from "@/src/components/signup/SignupForm";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [code, setCode] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
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
      setSuccessMessage(
        "Email verified successfully. You can now complete the signup.",
      );
    } catch (error) {
      console.error("Error verifying code:", error);
      setErrors(["Failed to verify code."]);
    }
  };

  const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

  const validatePassword = (password: string): boolean =>
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

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

    try {
      const response = await axiosInstance.post("/auth/signup", formData);
      const logout = await axiosInstance.get("/auth/logout");
      setSuccessMessage("Signup successful! Redirecting...");
      setErrors([]);
      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } catch (error) {
      if (isAxiosError(error)) {
        setErrors([
          error.response?.data?.error || "An unknown error occurred.",
        ]);
      }
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md">
      <SignupForm
        formData={formData}
        code={code}
        isSignupEnabled={isSignupEnabled}
        handleChange={handleChange}
        handleCodeChange={handleCodeChange}
        handleSendCode={handleSendCode}
        handleVerifyCode={handleVerifyCode}
        handleSubmit={handleSubmit}
      />
      {successMessage && (
        <p className="mt-4 text-sm text-green-600">{successMessage}</p>
      )}

      {errors &&
        errors.map((error, index) => (
          <p key={index} className="mt-4 text-sm text-red-600">
            {error}
          </p>
        ))}
    </div>
  );
};

export default Signup;
