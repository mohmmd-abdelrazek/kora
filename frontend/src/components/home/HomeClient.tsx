"use client";
import LoadingIndicator from "@/src/components/LoadingIndicator";
import { Link } from "@/src/navigation";
import { useAuth } from "@/src/services/queries";
import { HomeTextProps } from "@/src/types/textProps";

const HomeClient = (texts: HomeTextProps) => {
  const { data, isLoading, error } = useAuth();
  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  if (error) return <div>Failed to load</div>;

  return (
    <main className="flex h-full w-full flex-1 flex-col items-center justify-center text-center">
      {data?.isAuthenticated ? (
        <div>
          <h1 className="mb-4 text-4xl">
            {texts.homeGreeting}, {data.user.name}!
          </h1>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/create"
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              {texts.createPage}
            </Link>
            <Link
              href="/my-pages"
              className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
            >
              {texts.myPages}
            </Link>
          </div>
        </div>
      ) : (
        <h1 className="text-6xl font-bold">
          {texts.join} <a className="text-blue-600">{texts.league}</a>
        </h1>
      )}

      <p className="mt-3 text-2xl">
        {data?.isAuthenticated
          ? `${texts.startCreating}`
          : `${texts.signInToCreate}`}
      </p>
      <p className="mt-2 text-lg text-gray-600">{texts.easyManage}</p>
    </main>
  );
};

export default HomeClient;
