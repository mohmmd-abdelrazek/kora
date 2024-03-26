import { useLeague } from "../../services/queries";
import { useSearchParams } from "next/navigation";
import InputField from "./PlayerInput";
import LoadingIndicator from "../LoadingIndicator";
import clsx from "clsx";
import { LeagueTextProps } from "@/src/types/textProps";

type TeamSectionPropes = {
  teamId: string;
  teamName: string;
  texts: LeagueTextProps;
};

const TeamSection = ({ teamId, teamName, texts }: TeamSectionPropes) => {
  const { data: league, isLoading, error } = useLeague();
  const searchParams = useSearchParams();
  const selectedTeam = searchParams.get("team");

  if (error)
    return <div>{error.response.data.message || "Failed to load player."}</div>;
  if (isLoading)
    return (
      <div>
        <LoadingIndicator />
      </div>
    );

  return (
    <div
      className={clsx(
        "overflow-hidden w-full rounded-2xl shadow-md shadow-blue-400 transition-all duration-[1500ms] md:max-w-[400px]",
        selectedTeam === teamId
          ? "h-auto  opacity-100"
          : "pointer-events-none h-0 opacity-0",
      )}
    >
      <p className="border-b-2 bg-green-300 p-2 text-xl font-extrabold text-green-900">
        {teamName}
      </p>
      <div className="flex flex-col justify-between gap-6 bg-green-400 px-6 py-8">
        {[...Array(league?.players_per_team)].map((_, index) => (
          <InputField key={index} teamId={teamId} playerIndex={String(index)} texts={texts} />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
