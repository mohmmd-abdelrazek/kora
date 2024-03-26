"use client"
import { Link } from "@/src/navigation";
import clsx from "clsx";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { BiTable } from "react-icons/bi";
import { LeagueTextProps } from "@/src/types/textProps";

const MatchesTableButton = (texts: LeagueTextProps) => {
  const { leagueSlug } = useParams();
  const locale = useLocale();
  return (
    <Link
      className={clsx(
        "fixed bottom-14 flex w-fit items-center justify-center gap-3 rounded-full bg-blue-700 p-4 text-md font-bold text-white opacity-80 hover:bg-accent hover:text-text",
        locale === "ar" ? "right-5" : "left-5",
      )}
      href={`/league/${leagueSlug}/schedule`}
    >
      <span className="max-sm:hidden">{texts.matchesSchedule}</span>
      <BiTable size={25} />
    </Link>
  );
};

export default MatchesTableButton;
