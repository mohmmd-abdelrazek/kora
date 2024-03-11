import { Link } from "@/src/navigation";
import { useTranslations } from "next-intl";
import HeaderClient from "./HeaderClient";
import { HeaderTextProps } from "../types/headerTextProps";
import { SidebarButton } from "./SidebarButton";
import LocaleSwitcher from "./LocalSwitcher";

export const Header = () => {
  const t = useTranslations("Index");

  const texts: HeaderTextProps = {
    home: t("home"),
    create: t("create"),
    myLeagues: t("myLeagues"),
    signIn: t("signIn"),
    signUp: t("signUp"),
    logOut: t("logOut"),
  };

  return (
    <>
      <header className="flex items-center justify-between bg-gray-800 px-20 py-4 text-white shadow-md">
        <Link
          href="/"
          className="text-lg font-bold transition-colors hover:text-gray-300"
        >
          {t("logo")}
        </Link>
        <div className="hidden md:flex">
          <Link
            href="/"
            className="px-4 py-2 font-bold transition-colors hover:text-gray-300"
          >
            {t("home")}
          </Link>
          <HeaderClient {...texts} />
          <LocaleSwitcher />
        </div>
        <SidebarButton />
      </header>
    </>
  );
};

export default Header;
