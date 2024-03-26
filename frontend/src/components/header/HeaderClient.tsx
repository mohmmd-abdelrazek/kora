"use client";
import { Link } from "@/src/navigation";
import { useAuth } from "../../services/queries";
import LoadingIndicator from "../LoadingIndicator";
import { axiosInstance } from "../../services/fetcher";
import { HeaderTextProps } from "../../types/textProps";
import { useRouter } from "next/navigation";

const Header = (texts: HeaderTextProps) => {
  const { data, isLoading, error } = useAuth();
const router = useRouter();

  if (isLoading) return <LoadingIndicator />;
  if (error)
    return (
      <div className="text-center text-red-600">Failed to load user data.</div>
    );

  const isLoggedIn = data?.isAuthenticated;

  const handleLogout = async () => {
    try {
      const result = await axiosInstance("/auth/logout");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Link
            href="/create"
            className="transition-colors hover:text-gray-300"
          >
            {texts.create}
          </Link>
          <Link
            href="/my-leagues"
            className="transition-colors hover:text-gray-300"
          >
            {texts.myLeagues}
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm focus:shadow-outline rounded bg-red-500 px-2 py-1 font-bold text-white transition-colors hover:bg-red-700 focus:outline-none"
          >
            {texts.logOut}
          </button>
        </>
      ) : (
        <>
          <Link
            href="/signin"
            className="transition-colors hover:text-gray-300"
          >
            {texts.signIn}
          </Link>
          <Link
            href="/signup"
            className="text-md focus:shadow-outline rounded bg-blue-500 px-2 py-1 font-bold text-white transition-colors hover:bg-blue-700 focus:outline-none"
          >
            {texts.signUp}
          </Link>
        </>
      )}
    </>
  );
};

export default Header;
