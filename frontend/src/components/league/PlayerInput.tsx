"use client";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../services/fetcher";
import { useIsOwner } from "../../hooks/useIsOwner";
import { isAxiosError } from "axios";
import { useLocale } from "next-intl";
import { playerNameProps } from "@/src/types/player";
import useSWR from "swr";
import LoadingIndicator from "../LoadingIndicator";
import clsx from "clsx";
import { TbDotsVertical } from "react-icons/tb";
import { LeagueTextProps } from "@/src/types/textProps";

interface playerProps extends playerNameProps {
  texts: LeagueTextProps;
}

const PlayerInput = ({ teamId, playerIndex, texts }: playerProps) => {
  const [playerName, setPlayerName] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [originalValues, setOriginalValues] = useState({ name: '', position: '' });
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const locale = useLocale();

  const {
    data: player,
    isLoading,
    error,
  } = useSWR(`/player/${teamId}/${playerIndex}`);
  const { isOwner } = useIsOwner();

  useEffect(() => {
    if (player?.name && player?.position) {
      setPlayerName(player.name);
      setSelectedPosition(player.position);
      setOriginalValues({ name: player.name, position: player.position });
      setIsDisabled(true);
    } else {
      setPlayerName("");
      setSelectedPosition("");
      setOriginalValues({ name: "", position: "" });
      setIsDisabled(false);
    }
  }, [player?.name, player?.position]);

  if (isLoading)
    return (
      <div>
        <LoadingIndicator />
      </div>
    );
  if (error) return <div>Error fetching data</div>;

  const positions = [
    texts.goalkeeper,
    texts.defender,
    texts.midfielder,
    texts.forward,
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/player/submit", {
        teamId,
        playerIndex,
        name: playerName,
        position: selectedPosition,
      });

      if (response) {
        setIsDisabled(true);
        setOriginalValues({name: playerName, position: selectedPosition})
      }
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 409) {
        alert(error.response.data.message);
        console.error("Error submitting data:", error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.put(
        `/player/${teamId}/${playerIndex}`,
        {
          name: playerName,
          position: selectedPosition,
        },
      );
      setIsEditMode(false);
      setIsDisabled(true);
      setOriginalValues({name: playerName, position: selectedPosition})
      console.log("Edit successful", response.data);
    } catch (error) {
      console.error("Error editing data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (e: React.FormEvent) => {
    if (!confirm(texts.confirmDelete)) return;
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.delete(
        `/player/${teamId}/${playerIndex}`,
      );
      setPlayerName("");
      setSelectedPosition("");
      setIsDisabled(false);
      console.log("Delete successful", response.data);
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={isEditMode ? handleSubmitEdit : handleSubmit}
      className="h-18 relative flex items-center justify-center gap-4"
    >
      <select
        value={selectedPosition}
        onChange={(e) => setSelectedPosition(e.target.value)}
        disabled={isDisabled || isSubmitting}
        className="h-full rounded-lg px-1 py-2 text-xs font-bold text-text focus:outline-accent disabled:bg-green-100"
      >
        <option value="">{texts.selectPosition}</option>
        {positions.map((position, index) => (
          <option key={index} value={index}>
            {position}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        disabled={isDisabled || isSubmitting}
        placeholder={texts.enterName}
        className="text-md h-full flex-1 rounded-lg p-2 font-bold text-text focus:outline-accent disabled:w-fit disabled:bg-green-100 max-sm:min-w-0"
      />
      <button
        type="submit"
        disabled={isDisabled || isEditMode || !selectedPosition || !playerName}
        className={clsx(
          "absolute items-center rounded-lg px-2 py-1 text-sm font-medium disabled:hidden",
          isSubmitting
            ? "bg-slate-500 text-white"
            : "bg-slate-800 text-white hover:bg-gradient-to-br",
          locale === "en" ? "right-1" : "left-1",
        )}
      >
        {isSubmitting ? texts.registering : texts.register}
      </button>
      {isOwner && isDisabled && (
        <button
          type="button"
          onClick={() => setShowActions(!showActions)}
          className={clsx(
            "absolute flex items-center justify-center rounded-md bg-slate-50 text-gray-900",
            locale === "ar" ? "-left-5" : "-right-5",
          )}
        >
          <TbDotsVertical />
        </button>
      )}
      {isOwner && isDisabled && showActions && (
        <div
          className={clsx(
            "absolute flex gap-1 p-1",
            locale === "ar" ? "left-0" : "right-0",
          )}
        >
          <button
            type="button"
            onClick={() => {
              setIsEditMode(true);
              setIsDisabled(false);
            }}
            className="items-center rounded-lg bg-slate-800 px-2 py-1 text-sm font-medium text-white hover:bg-gradient-to-br"
          >
            {texts.edit}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="items-center rounded-lg bg-slate-800 px-2 py-1 text-sm font-medium text-white hover:bg-gradient-to-br"
          >
            {texts.delete}
          </button>
        </div>
      )}
      {isEditMode && (
        <div
          className={clsx(
            "absolute flex gap-1 p-1",
            locale === "ar" ? "left-0" : "right-0",
          )}
        >
          <button
            type="submit"
            className="items-center rounded-lg bg-slate-800 px-2 py-1 text-sm font-medium text-white hover:bg-gradient-to-br"
          >
            {texts.ok}
          </button>
          <button
            type="button"
            onClick={() => {
              setIsEditMode(false);
              setIsDisabled(true);
              setPlayerName(originalValues.name);
              setSelectedPosition(originalValues.position);
            }}
            className="items-center rounded-lg bg-red-500 px-2 py-1 text-sm font-medium text-white hover:bg-red-700"
          >
            {texts.cancel}
          </button>
        </div>
      )}
    </form>
  );
};

export default PlayerInput;
