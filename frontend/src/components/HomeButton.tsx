import { usePathname } from "next/navigation";
import schedule from "@/public/icons/schedule2.png";
import team from "@/public/icons/team.png";
import { Link } from "@/src/navigation";
import Image from "next/image";

const HomeButton = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <Link
      className="text-md flex w-fit gap-3 rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-accent hover:text-text"
      href={isHomePage ? "/matches-table" : "/"}
    >
      <span className="max-sm:hidden">
        {isHomePage ? "جدول المباريات" : "الصفحة الرئيسية"}
      </span>
      <Image
        className="w-auto"
        src={isHomePage ? schedule : team}
        alt="schedule"
        height={15}
      />
    </Link>
  );
};

export default HomeButton;
