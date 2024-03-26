"use client"
import { Link } from "@/src/navigation";
import { useParams } from "next/navigation";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { RiTeamFill } from "react-icons/ri";

const LeagueButton = ({text}: {text: string}) => {
  const { leagueSlug } = useParams();
  const locale = useLocale();
  return (
    <Link
      className={clsx(
        "fixed bottom-14 flex w-fit items-center justify-center gap-3 rounded-full bg-blue-700 p-4 text-md font-bold text-white opacity-80 hover:bg-accent hover:text-text",
        locale === "ar" ? "right-5" : "left-5",
      )}
      href={`/league/${leagueSlug}`}
    >
      <span className="max-sm:hidden">{text}</span>
      <RiTeamFill size={25} />
    </Link>
  );
};

export default LeagueButton;
