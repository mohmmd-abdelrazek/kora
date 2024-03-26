import SignupForm from "@/src/components/signup/SignupForm";
import { Link } from "@/src/navigation";
import { SignupTextProps } from "@/src/types/textProps";
import { useTranslations } from "next-intl";

const Signup = () => {
  const t = useTranslations("Signup");
  const texts: SignupTextProps = {
    createAccount: t("createAccount"),
    alreadyHaveAccount: t("alreadyHaveAccount"),
    signIn: t("signIn"),
    nameLabel: t("nameLabel"),
    emailLabel: t("emailLabel"),
    passwordLabel: t("passwordLabel"),
    confirmPasswordLabel: t("confirmPasswordLabel"),
    sendVerificationCode: t("sendVerificationCode"),
    verificationCodePlaceholder: t("verificationCodePlaceholder"),
    verifyCode: t("verifyCode"),
    signUpButton: t("signUpButton"),
    signingUp: t("signingUp"),
    successMessage: t("successMessage"),
    errorMessage: t("errorMessage"),
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-gray-100 px-4 py-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-5 rounded-lg bg-white py-4 sm:px-10 px-4 shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          {texts.createAccount}
        </h2>
        <SignupForm {...texts} />
        <p className="mt-6 flex items-center justify-center gap-2 text-center text-sm text-gray-600">
          {texts.alreadyHaveAccount}
          <Link
            href="/signin"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {texts.signIn}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
