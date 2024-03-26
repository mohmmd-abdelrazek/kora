import SigninForm from "@/src/components/signin/signinForm";
import { SigninTextProps } from "@/src/types/textProps";
import { useTranslations } from "next-intl";

function Signin() {
  const t = useTranslations("SignIn");
  const texts: SigninTextProps = {
    email: t("email"),
    emailPlaceholder: t("emailPlaceholder"),
    password: t("password"),
    passwordPlaceholder: t("passwordPlaceholder"),
    signIn: t("signIn"),
    signingIn: t("signingIn"),
    error: t("error"),
  };

  return (
    <div className="responsive-container flex flex-1 items-center justify-center bg-gray-100 py-2">
      <div className="w-full max-w-sm space-y-6 rounded-md bg-white p-6 shadow-md sm:max-w-md sm:p-8">
        <h2 className="text-center text-xl font-semibold text-gray-800 sm:text-2xl">
          {texts.signIn}
        </h2>
        <SigninForm {...texts} />
      </div>
    </div>
  );
}

export default Signin;
