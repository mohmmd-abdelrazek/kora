"use client";
import { useSchedule } from "@/src/services/queries";
import LoadingIndicator from "@/src/components/LoadingIndicator";
import { useLocale } from "next-intl";

const ScheduleTable = () => {
  const locale = useLocale();
  const { data: schedule, isLoading, error } = useSchedule();

  if (isLoading || error) {
    return (
      <tr className="h-32">
        <td colSpan={7}>
          {isLoading ? <LoadingIndicator /> : error.response?.data.message || "Failed to load schedule."}
        </td>
      </tr>
    );
  }
const formatter = new Intl.DateTimeFormat(locale, {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true
});

  return (
    <>
      {schedule?.map((match: any, index: any) => (
        <tr key={index} className="border-b dark:border-gray-700">
          <td className="whitespace-nowrap px-6 py-4">{match.round}</td>
          <td className="px-6 py-4">{match.homeTeam}</td>
          <td className="px-6 py-4">{match.awayTeam}</td>
          <td className="px-6 py-4">{match.playground}</td>
          <td className="px-6 py-4">{formatter.format(new Date(match.startTime))}</td>
          <td className="px-6 py-4">{formatter.format(new Date(match.endTime))}</td>
          <td className="px-6 py-4">{match.type}</td>
        </tr>
      ))}
    </>
  );
};

export default ScheduleTable;
