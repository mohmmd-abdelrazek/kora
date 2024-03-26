"use client";
import { useCallback, useEffect } from "react";
import { Team } from "@/src/types/team";
import { useIsOwner } from "@/src/hooks/useIsOwner";
import { useLeague, useTeams } from "@/src/services/queries";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/src/navigation";
import Image from "next/image";
import ball from "@/public/icons/football.png";
import LoadingIndicator from "@/src/components/LoadingIndicator";
import ShareButton from "@/src/components/league/ShareButton";
import Tab from "@/src/components/league/Tab";
import { LeagueTextProps } from "@/src/types/textProps";

const TabSide = (texts: LeagueTextProps) => {
  const { data: teams, isLoading, error } = useTeams();
  const {
    data: league,
    isLoading: leagueLoading,
    error: leagueError,
  } = useLeague();
  const { isOwner, isLoading: ownerLoading, error: ownerError } = useIsOwner();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedTeam = searchParams.get("team");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    if (teams && teams.length > 0 && !selectedTeam) {
      router.push(pathname + "?" + createQueryString("team", teams[0].team_id));
    }
  }, [teams, selectedTeam, router, pathname, createQueryString]);

  if (error || ownerError || leagueError)
    return (
      <div className="flex-1">
        {error.response?.data.message || "Failed to load teams."}
      </div>
    );
  if (isLoading || ownerLoading || leagueLoading) return <LoadingIndicator />;

  return (
    <>
      <div className="flex flex-col items-center gap-3 px-4 py-2 max-sm:flex-row max-sm:justify-between sm:mt-5">
        <h2 className="flex flex-col items-center gap-2 text-white max-sm:flex-row md:flex-row">
          <Image src={ball} alt="ball" height={30}></Image>
          {league?.name}
        </h2>
        {isOwner && <ShareButton texts={texts} />}
      </div>
      <ul className="team-list flex h-72 flex-col gap-4 overflow-y-auto rounded-xl px-4 py-2 text-sm font-medium text-text max-sm:h-auto max-sm:flex-row max-sm:overflow-x-auto sm:w-fit dark:text-gray-400">
        {teams.map((team: Team) => (
          <Tab
            key={team.team_id}
            teamId={String(team.team_id)}
            selectedTeam={selectedTeam}
            handleClick={() =>
              router.push(
                pathname + "?" + createQueryString("team", team.team_id),
              )
            }
            teamName={team.name}
          />
        ))}
        ;
      </ul>
    </>
  );
};

export default TabSide;
