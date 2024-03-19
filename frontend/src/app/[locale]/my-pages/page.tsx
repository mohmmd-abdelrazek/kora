import MyLeagues from "@/src/components/myPages/MyLeagues";
import { Link } from "@/src/navigation";
import { useTranslations } from "next-intl";

const UserPages = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col flex-1 bg-gray-50 responsive-container py-4">
        <h1 className="mb-10 text-center text-4xl font-bold text-gray-800">
          My Leagues
        </h1>
        <div className="dynamic-grid">
          <MyLeagues />
        </div>
        <div className="mt-8 text-center">
          <Link href="/create" className="text-lg text-blue-600 hover:underline">
            + Create New League
          </Link>
      </div>
    </div>
  );
};

export default UserPages;
