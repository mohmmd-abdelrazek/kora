import { Link } from "@/src/navigation";
import { useTranslations } from "next-intl";
import HeaderClient from "./HeaderClient";
import { HeaderTextProps } from "../../types/textProps";
import LocaleSwitcher from "./LocalSwitcher";
import Sidebar from "./Sidebar";

export const Header = () => {
  const t = useTranslations("Index");

  const texts: HeaderTextProps = {
    home: t("home"),
    create: t("create"),
    myLeagues: t("myLeagues"),
    signIn: t("signIn"),
    signUp: t("signUp"),
    logOut: t("logOut"),
    close: t("close"),
  };

  return (
    <header className="flex md:sticky md:top-0 md:z-10 items-center justify-between bg-gray-800 responsive-container py-2 text-white shadow-md">
      <Link
        href="/"
        className="text-lg px-2 py-1 font-bold transition-colors hover:text-gray-300"
      >
        {t("logo")}
      </Link>
      <div className="hidden items-center gap-3 md:flex">
        <Link
          href="/"
          className="px-2 py-1 font-bold transition-colors hover:text-gray-300"
        >
          {t("home")}
        </Link>
        <HeaderClient {...texts} />
        <LocaleSwitcher />
      </div>
      <Sidebar {... texts} />
    </header>
  );
};

export default Header;
