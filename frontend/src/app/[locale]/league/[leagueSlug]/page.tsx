import TabSide from "@/src/components/league/TabSide";
import Teams from "@/src/components/league/Teams";
import MatchesTableButton from "@/src/components/league/MatchesTableButton";
import { useTranslations } from "next-intl";
import { LeagueTextProps } from "@/src/types/textProps";

const League = () => {
  const t = useTranslations("league");
  const texts: LeagueTextProps = {
    joinTeamNow: t("joinTeamNow"),
    ifTeamsFull: t("ifTeamsFull"),
    tryAgain: t("tryAgain"),
    selectPosition: t("selectPosition"),
    enterName: t("enterName"),
    registering: t("registering"),
    register: t("register"),
    edit: t("edit"),
    ok: t("ok"),
    cancel: t("cancel"),
    delete: t("delete"),
    confirmDelete: t("confirmDelete"),
    share: t("share"),
    matchesSchedule: t("matchesSchedule"),
    viewMatches: t("viewMatches"),
    goalkeeper: t("goalkeeper"),
    defender: t("defender"),
    midfielder: t("midfielder"),
    forward: t("forward"),
  };
  return (
    <div className="flex flex-1 max-sm:flex-col">
      <div className="flex w-full flex-col gap-8 bg-slate-700 shadow-md max-sm:gap-3 sm:w-2/6 sm:items-center">
        <TabSide {...texts} />
      </div>
      <div className="flex sm:flex-col flex-1 items-center bg-slate-100">
        <div className="flex max-sm:w-full flex-col px-2 gap-8 py-4">
          <div className="max-sm:hidden">
            <h2 className="mb-5 text-slate-700">
              {texts.joinTeamNow}
            </h2>
            <p className="font-bold text-slate-500">
              {texts.ifTeamsFull} <br />
              {texts.tryAgain}
            </p>
          </div>
          <div className="flex flex-1 flex-col">
            <Teams {...texts} />
          </div>
        </div>
      </div>
      <MatchesTableButton {...texts} />
    </div>
  );
};

export default League;
