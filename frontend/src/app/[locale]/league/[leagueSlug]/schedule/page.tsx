import ScheduleTable from "@/src/components/schedule/ScheduleTable";
import LeagueButton from "@/src/components/schedule/LeagueButton";
import { useTranslations } from "next-intl";

const SchedulePage = () => {
  const t = useTranslations("schedule");

  return (
    <div className="responsive-container flex-1">
      <h1 className="mb-8 text-center text-3xl font-semibold text-gray-800 sm:text-4xl">
        {t("title")}
      </h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full text-nowrap text-center text-gray-500 dark:text-gray-400">
          <thead className="text-md text-wrap bg-gray-50 uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-4 py-4">
                {t("round")}
              </th>
              <th scope="col" className="px-4 py-4">
                {t("homeTeam")}
              </th>
              <th scope="col" className="px-4 py-4">
                {t("awayTeam")}
              </th>
              <th scope="col" className="px-4 py-4">
                {t("playground")}
              </th>
              <th scope="col" className="px-4 py-4">
                {t("startTime")}
              </th>
              <th scope="col" className="px-4 py-4">
                {t("endTime")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            <ScheduleTable />
          </tbody>
        </table>
      </div>
      <LeagueButton text={t("tooltip")} />
    </div>
  );
};

export default SchedulePage;
