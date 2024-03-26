"use client"
import LoadingIndicator from "@/src/components/LoadingIndicator";
import { Link } from "@/src/navigation";
import { useLeagues } from "@/src/services/queries";
import withAuth from "@/src/utils/withAuth";

const MyLeagues = () => {
  const { data: leagues, isLoading, error } = useLeagues();

  if (error) return <div className="text-red-500">{error.response.data.message || "Failed to load leagues"}</div>;
  if (isLoading) return <LoadingIndicator />;

  return (
    <>
      {leagues?.map((league) => (
        <div
          key={league.id}
          className="overflow-hidden flex rounded-lg bg-white shadow transition-shadow duration-300 ease-in-out hover:shadow-lg"
        >
          <Link
            href={`/league/${league.slug}`}
            className="block p-6 text-lg flex-1 text-blue-600 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-blue-800"
          >
            {league.name}
          </Link>
        </div>
      ))}
    </>
  );
};

export default withAuth(MyLeagues);
