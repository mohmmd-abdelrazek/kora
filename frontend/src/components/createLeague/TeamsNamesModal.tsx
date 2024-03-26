"use client";
import { EditTeamsProps } from "@/src/types/createLeague";
import { CreateLeagueTextProps } from "@/src/types/textProps";
import { useState, useEffect, useCallback, useRef } from "react";

interface TeamsModalProps extends EditTeamsProps {
  texts: CreateLeagueTextProps;
}

const EditTeamsModal = ({
  isOpen,
  numberOfTeams,
  initialTeamNames,
  onSave,
  onClose,
  texts,
}: TeamsModalProps) => {
  const [teamNames, setTeamNames] = useState<string[]>([]);
  const [originalTeamNames, setOriginalTeamNames] = useState<string[]>([]);
  const teamNamesRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        teamNamesRef.current &&
        !teamNamesRef.current.contains(event.target as Node)
      ) {
        onClose(originalTeamNames);
      }
    },

    [onClose, originalTeamNames],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    const names = Array(numberOfTeams)
      .fill(null)
      .map((_, index) => initialTeamNames[index] || `${texts.team} ${index + 1}`);
    setTeamNames(names);
    setOriginalTeamNames(names);
  }, [numberOfTeams, initialTeamNames, texts.team]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex justify-center bg-gray-600 bg-opacity-75">
      <div
        ref={teamNamesRef}
        className="my-4 overflow-auto rounded-lg bg-white p-4"
      >
        <h2 className="text-lg">{texts.editTeamNames}</h2>
        {teamNames.map((name, index) => (
          <input
            key={index}
            type="text"
            value={name}
            onChange={(e) => {
              const newTeamNames = [...teamNames];
              newTeamNames[index] = e.target.value;
              setTeamNames(newTeamNames);
            }}
            className="mb-2 mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        ))}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onSave(teamNames)}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            {texts.save}
          </button>
          <button
            onClick={() => onClose(originalTeamNames)}
            className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
          >
            {texts.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditTeamsModal;
