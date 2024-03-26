"use client"
import { Team } from "@/src/types/team";
import { useTeams } from "@/src/services/queries";
import TeamSection from "./TeamSection";
import LoadingIndicator from "../LoadingIndicator";
import { LeagueTextProps } from "@/src/types/textProps";


const Teams = (texts: LeagueTextProps) => {
  const { data: teams, isLoading, error } = useTeams();
  
  if (error)
    return (
      <div className="flex-1">
        {error.ressponse?.data.message || "Failed to load teams."}
      </div>
    );
  if (isLoading) return <LoadingIndicator />;
  return (
    <>
      {teams.map((team: Team) => (
        <TeamSection
          key={team.team_id}
          teamId={String(team.team_id)}
          teamName={team.name}
          texts={texts}
        />
      ))}
    </>
  );
};

export default Teams;
