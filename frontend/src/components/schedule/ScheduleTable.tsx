"use client";
import { useSchedule } from "@/src/services/queries";
import LoadingIndicator from "@/src/components/LoadingIndicator";

const ScheduleTable = () => {
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

  return (
    <>
      {schedule?.map((match: any, index: any) => (
        <tr key={index} className="border-b dark:border-gray-700">
          <td className="whitespace-nowrap px-6 py-4">{match.round}</td>
          <td className="px-6 py-4">{match.homeTeam}</td>
          <td className="px-6 py-4">{match.awayTeam}</td>
          <td className="px-6 py-4">{match.playground}</td>
          <td className="px-6 py-4">{match.startTime}</td>
          <td className="px-6 py-4">{match.endTime}</td>
          <td className="px-6 py-4">{match.type}</td>
        </tr>
      ))}
    </>
  );
};

export default ScheduleTable;
