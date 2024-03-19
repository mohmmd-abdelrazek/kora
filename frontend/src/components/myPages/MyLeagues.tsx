"use client"
import LoadingIndicator from "@/src/components/LoadingIndicator";
import { Link } from "@/src/navigation";
import { useLeagues } from "@/src/services/queries";
import withAuth from "@/src/utils/withAuth";

const MyLeagues = () => {
  const { data: pages, isLoading, error } = useLeagues();

  console.log(pages);

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <LoadingIndicator />;
  return (
    <>
      {pages?.map((page) => (
        <div
          key={page.id}
          className="overflow-hidden rounded-lg bg-white shadow transition-shadow duration-300 ease-in-out hover:shadow-lg"
        >
          <Link
            href={`/league/${page.slug}`}
            className="block p-6 text-lg text-blue-600 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-blue-800"
          >
            {page.name}
          </Link>
        </div>
      ))}
    </>
  );
};

export default withAuth(MyLeagues);
