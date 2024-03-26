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

export interface EditTeamsProps {
  isOpen: boolean;
  numberOfTeams: number;
  initialTeamNames: string[];
  onSave: (teamNames: string[]) => void;
  onClose: (originalTeamNames: string[]) => void;
}