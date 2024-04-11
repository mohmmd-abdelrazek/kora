import LeagueButton from "@/src/components/schedule/LeagueButton";
import ScheduleTable from "@/src/components/schedule/ScheduleTable";
import { useTranslations } from "next-intl";

const SchedulePage = () => {
  const t = useTranslations("schedule");

  return (
    <div className="responsive-container px-4 py-2 flex-1">
      <h1 className="mb-8 text-center text-3xl font-semibold text-gray-800 sm:text-4xl">
        {t("title")}
      </h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full text-center text-nowrap text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-wrap text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                {t("round")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("homeTeam")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("awayTeam")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("playground")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("startTime")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("endTime")}
              </th>
              <th scope="col" className="px-6 py-3">
                {t("type")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800">
            <ScheduleTable />
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-center">
        <LeagueButton text={t("tooltip")} />
      </div>
    </div>
  );
};

export default SchedulePage;
