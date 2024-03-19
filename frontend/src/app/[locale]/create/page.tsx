"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosInstance } from "@/src/services/fetcher";
import withAuth from "@/src/utils/withAuth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { LeagueFormData } from "@/src/types/createLeague";

const CreateLeaguePage = () => {
  const [formData, setFormData] = useState<LeagueFormData>({
    leagueName: "",
    numberOfTeams: 3,
    playersPerTeam: 5,
    dateString: new Date(),
    startTime: "",
    matchDuration: 10,
    breakDuration: 5,
    totalPlayTime: 120,
    numberOfPlaygrounds: 1,
    teamNames: [],
  });
  const [weekday, setWeekday] = useState("");

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
          .map((_, index) => formData.teamNames[index] || `فريق ${index + 1}`);
        setFormData((prev) => ({ ...prev, teamNames: newTeamNames }));
      }
    }
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleDateChange = (dateString: Date | null) => {
    const days = [
      "الأحد",
      "الاثنين",
      "الثلاثاء",
      "الأربعاء",
      "الخميس",
      "الجمعة",
      "السبت",
    ];
    setWeekday(dateString ? days[dateString.getDay()] : "");
    setFormData((prev) => ({
      ...prev,
      dateString,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      router.push(`/league/${response.data.leagueSlug}`);
    } catch (error) {
      console.error("Failed to create league:", error);
    }
  };

  const inputFields = [
    {
      id: "leagueName",
      name: "leagueName",
      type: "text",
      label: "اسم الدوري",
      value: formData.leagueName,
    },
    {
      id: "numberOfTeams",
      name: "numberOfTeams",
      type: "number",
      label: "عدد الفرق",
      value: formData.numberOfTeams,
    },
    {
      id: "playersPerTeam",
      name: "playersPerTeam",
      type: "number",
      label: "عدد اللاعبين في الفريق",
      value: formData.playersPerTeam,
    },
    {
      id: "matchDuration",
      name: "matchDuration",
      type: "number",
      label: "مدة المباراة (بالدقائق)",
      value: formData.matchDuration,
    },
    {
      id: "breakDuration",
      name: "breakDuration",
      type: "number",
      label: "مدة الراحة (بالدقائق)",
      value: formData.breakDuration,
    },
    {
      id: "totalPlayTime",
      name: "totalPlayTime",
      type: "number",
      label: "الوقت الكلي للعب (بالدقائق)",
      value: formData.totalPlayTime,
    },
    {
      id: "numberOfPlaygrounds",
      name: "numberOfPlaygrounds",
      type: "number",
      label: "عدد الملاعب المتاحة",
      value: formData.numberOfPlaygrounds,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl space-y-6 rounded-2xl bg-white p-10 shadow-2xl"
      >
        <h2 className="text-center text-4xl font-extrabold text-indigo-600">
          تسجيل دوري جديد
        </h2>

        <div className="dynamic-grid">
          {inputFields.map((input) => (
            <div key={input.id} className="flex flex-col">
              <label
                htmlFor={input.id}
                className="mb-1 text-lg font-semibold text-gray-800"
              >
                {input.label}
              </label>
              <input
                id={input.id}
                name={input.name}
                type={input.type}
                value={input.value}
                onChange={handleChange}
                required
                min="1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500"
              />
            </div>
          ))}
        </div>

        <div className="dynamic-grid">
          <div className="flex flex-col">
            <label
              htmlFor="date"
              className="text-lg font-semibold text-gray-800"
            >
              تاريخ البداية
            </label>
            <DatePicker
              id="date"
              selected={formData.dateString}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500"
            />
            <span className="text-sm font-semibold text-gray-600">{weekday}</span>
          </div>

          <div>
            <label
              htmlFor="startTime"
              className="block text-lg font-medium text-gray-700"
            >
              وقت البداية
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 leading-tight shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500"
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 inline-flex w-full justify-center rounded-lg bg-indigo-600 px-6 py-4 text-xl font-bold text-white shadow-md transition duration-200 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          تسجيل
        </button>
      </form>
    </div>
  );
};

export default withAuth(CreateLeaguePage);
