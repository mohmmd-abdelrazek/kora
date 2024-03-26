
type TabPropes = {
  selectedTeam: string | null;
  teamId: string;
  teamName: string;
  handleClick: () => void;
};

const Tab = ({ selectedTeam, teamId, teamName, handleClick }: TabPropes) => {
  return (
    <button
      onClick={handleClick}
      className={`inline-block text-nowrap w-full rounded-lg px-4 py-2 shadow-lg ${
        selectedTeam === teamId
          ? "bg-blue-400 text-white"
          : "bg-blue-100 hover:bg-blue-200 hover:text-blue-900"
      }`}
    >
      {teamName}
    </button>
  );
};

export default Tab;
