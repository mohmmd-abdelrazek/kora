import InputField from "../InputField";
import SendCodeButton from "./SendCodeButton";
import VerifyCodeSection from "./VerifyCodeSection";

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface SignupFormProps {
  formData: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSendCode: () => void;
  code: string;
  handleCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVerifyCode: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSignupEnabled: boolean;
}

const SignupForm: React.FC<SignupFormProps> = ({
  formData,
  handleChange,
  handleSendCode,
  code,
  handleCodeChange,
  handleVerifyCode,
  handleSubmit,
  isSignupEnabled,
}) => (
  <form onSubmit={handleSubmit} className="space-y-4">
    <InputField
      id="name"
      name="name"
      type="text"
      value={formData.name}
      onChange={handleChange}
      label="Name"
    />
    <InputField
      id="email"
      name="email"
      type="email"
      value={formData.email}
      onChange={handleChange}
      label="Email"
    />
    <InputField
      id="password"
      name="password"
      type="password"
      value={formData.password}
      onChange={handleChange}
      label="Password"
    />
    <SendCodeButton onClick={handleSendCode} />
    <VerifyCodeSection
      code={code}
      onCodeChange={handleCodeChange}
      onVerify={handleVerifyCode}
    />
    <button
      type="submit"
      className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      disabled={
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !isSignupEnabled
      }
    >
      Sign Up
    </button>
  </form>
);

export default SignupForm;
