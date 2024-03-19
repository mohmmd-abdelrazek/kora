export interface LeagueFormData {
  leagueName: string;
  numberOfTeams: number;
  playersPerTeam: number;
  dateString: Date | null;
  startTime: string;
  matchDuration: number;
  breakDuration: number;
  totalPlayTime: number;
  numberOfPlaygrounds: number;
  teamNames: string[];
}
