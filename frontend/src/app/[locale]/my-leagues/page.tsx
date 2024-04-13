import MyLeagues from "@/src/components/myLeagues/MyLeagues";
import { Link } from "@/src/navigation";
import { MyLeaguesTextsProps } from "@/src/types/textProps";
import { useTranslations } from "next-intl";

const UserLeagues = () => {
  const t = useTranslations("myLeagues");
  const texts: MyLeaguesTextsProps = {
    title: t("title"),
    createNewLeague: t("createNewLeague"),
    fetchFailed: t("fetchFailed"),
  };
  return (
    <div className="responsive-container flex flex-1 flex-col bg-gray-50 py-4">
      <h1 className="mb-10 text-center text-4xl font-bold text-gray-800">
        {texts.title}
      </h1>
      <div className="dynamic-grid">
        <MyLeagues />
      </div>
      <div className="mt-12 text-center">
        <Link href="/create" className="text-lg text-blue-600 hover:underline">
          {texts.createNewLeague}
        </Link>
      </div>
    </div>
  );
};

export default UserLeagues;
