import CreateLeagueForm from "@/src/components/createLeague/CreateLeagueForm";
import { CreateLeagueTextProps } from "@/src/types/textProps";
import { useTranslations } from "next-intl";

const CreateLeaguePage = () => {
  const t = useTranslations("CreateLeague");
  const texts: CreateLeagueTextProps = {
    title: t("title"),
    editTeamNames: t("editTeamNames"),
    save: t("save"),
    cancel: t("cancel"),
    team: t("team"),
    leagueName: t("leagueName"),
    numberOfTeamsText: t("numberOfTeams"),
    playersPerTeam: t("playersPerTeam"),
    matchDuration: t("matchDuration"),
    breakDuration: t("breakDuration"),
    totalPlayTime: t("totalPlayTime"),
    numberOfPlaygrounds: t("numberOfPlaygrounds"),
    startDate: t("startDate"),
    startTime: t("startTime"),
    register: t("register"),
    sunday: t("sunday"),
    monday: t("monday"),
    tuesday: t("tuesday"),
    wednesday: t("wednesday"),
    thursday: t("thursday"),
    friday: t("friday"),
    saturday: t("saturday"),
  };

  return (
    <div className="responsive-container flex flex-1 flex-col items-center gap-4 bg-gray-100 py-4">
        <h2 className="text-center text-2xl font-bold text-slate-600">
          {texts.title}
        </h2>
      <div className="my-4 w-full space-y-6 rounded-2xl bg-white px-8 py-4 shadow-2xl max-sm:px-4">
        <CreateLeagueForm {...texts} />
      </div>
    </div>
  );
};

export default CreateLeaguePage;
