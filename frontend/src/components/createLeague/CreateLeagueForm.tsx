"use client";
import { useState } from "react";
import { useRouter } from "@/src/navigation";
import { CreateLeagueTextProps } from "@/src/types/textProps";
import { LeagueFormData } from "@/src/types/createLeague";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { axiosInstance } from "@/src/services/fetcher";
import withAuth from "@/src/utils/withAuth";
import EditTeamsModal from "@/src/components/createLeague/TeamsNamesModal";

const CreateLeagueForm = (texts: CreateLeagueTextProps) => {
  const [formData, setFormData] = useState<LeagueFormData>({
    leagueName: "",
    numberOfTeams: 0,
    playersPerTeam: 2,
    dateString: new Date(),
    startTime: "18:00",
    matchDuration: 5,
    breakDuration: 0,
    totalPlayTime: 10,
    numberOfPlaygrounds: 1,
    teamNames: [],
  });
  const [weekday, setWeekday] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "date") return;

    let updatedValue: any = value;
    if (
      name === "numberOfTeams" ||
      name === "playersPerTeam" ||
      name === "matchDuration"
    ) {
      updatedValue = parseInt(value);
      if (name === "numberOfTeams") {
        const newTeamNames = Array(updatedValue)
          .fill(null)
          .map(
            (_, index) =>
              formData.teamNames[index] || `${texts.team} ${index + 1}`,
          );
        setFormData((prev) => ({ ...prev, teamNames: newTeamNames }));
      }
    }
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleDateChange = (dateString: Date | null) => {
    const days = [
      texts.sunday,
      texts.monday,
      texts.tuesday,
      texts.wednesday,
      texts.thursday,
      texts.friday,
      texts.saturday,
    ];
    setWeekday(dateString ? days[dateString.getDay()] : "");
    setFormData((prev) => ({
      ...prev,
      dateString,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const dateToSend = formData.dateString
      ? formData.dateString.toISOString()
      : null;
    const payload = {
      ...formData,
      dateString: dateToSend,
      teamNames: formData.teamNames.filter((name) => name.trim() !== ""),
    };
    try {
      const response = await axiosInstance.post("/league", payload);
      setIsLoading(false);
      router.push(`/league/${response.data.leagueSlug}`);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to create league:", error);
    }
  };

  const inputFields = [
    {
      id: "leagueName",
      name: "leagueName",
      type: "text",
      label: texts.leagueName,
      value: formData.leagueName,
    },
    {
      id: "numberOfTeams",
      name: "numberOfTeams",
      type: "number",
      label: texts.numberOfTeamsText,
      min: 2,
      value: formData.numberOfTeams,
    },
    {
      id: "playersPerTeam",
      name: "playersPerTeam",
      type: "number",
      label: texts.playersPerTeam,
      min: 2,
      value: formData.playersPerTeam,
    },
    {
      id: "matchDuration",
      name: "matchDuration",
      type: "number",
      label: texts.matchDuration,
      min: 5,
      value: formData.matchDuration,
    },
    {
      id: "breakDuration",
      name: "breakDuration",
      type: "number",
      label: texts.breakDuration,
      min: 0,
      value: formData.breakDuration,
    },
    {
      id: "totalPlayTime",
      name: "totalPlayTime",
      type: "number",
      label: texts.totalPlayTime,
      min: 10,
      value: formData.totalPlayTime,
    },
    {
      id: "numberOfPlaygrounds",
      name: "numberOfPlaygrounds",
      type: "number",
      label: texts.numberOfPlaygrounds,
      min: 1,
      value: formData.numberOfPlaygrounds,
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="my-4 w-full space-y-6 rounded-2xl bg-white px-12 max-sm:px-4"
    >
      <div className="dynamic-grid">
        {inputFields.map((input) => (
          <div key={input.id} className="flex flex-col">
            <label
              htmlFor={input.id}
              className="mb-1 text-md font-semibold text-gray-800"
            >
              {input.label}
            </label>
            <input
              id={input.id}
              name={input.name}
              type={input.type}
              value={input.value}
              onChange={handleChange}
              disabled={isLoading}
              required
              min={input.min}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500"
            />
          </div>
        ))}
        <>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-md border self-end border-transparent bg-green-500 px-4 py-2 text-md font-medium text-white shadow-sm hover:bg-green-600"
          >
            {texts.editTeamNames}
          </button>
          <EditTeamsModal
            isOpen={isModalOpen}
            numberOfTeams={formData.numberOfTeams}
            initialTeamNames={formData.teamNames}
            onSave={(teamNames) => {
              setFormData((prev) => ({ ...prev, teamNames }));
              setIsModalOpen(false);
            }}
            onClose={(originalTeamNames) => {
              setFormData((prev) => ({ ...prev, teamNames: originalTeamNames}))
              setIsModalOpen(false);
            }}
            texts={texts}
          />
        </>
      </div>

      <div className="dynamic-grid">
        <div className="flex flex-col">
          <label htmlFor="date" className="text-md font-semibold text-gray-800">
            {texts.startDate}
          </label>
          <DatePicker
            id="date"
            selected={formData.dateString}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            disabled={isLoading}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500"
          />
          <span className="text-sm font-semibold text-gray-600">{weekday}</span>
        </div>

        <div>
          <label
            htmlFor="startTime"
            className="block text-md font-medium text-gray-700"
          >
            {texts.startTime}
          </label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            required
            disabled={isLoading}
            value={formData.startTime}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500"
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2 text-lg font-bold text-white shadow-md transition duration-200 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        {texts.register}
      </button>
    </form>
  );
};

export default withAuth(CreateLeagueForm);
