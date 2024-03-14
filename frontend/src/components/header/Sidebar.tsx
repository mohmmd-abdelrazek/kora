import Link from "next/link";
import { axiosInstance } from "../../services/fetcher";
import { useAuth } from "@/src/services/queries";
import { useCallback, useEffect, useRef } from "react";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar = ({ isOpen, toggle }: SidebarProps) => {
  const { data, error } = useAuth();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        toggle();
      }
    },

    [toggle],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (error)
    return (
      <div className="text-center text-red-600">Failed to load user data.</div>
    );

  const isLoggedIn = data?.isAuthenticated;

  if (!isOpen) return null;

  const handleLogout = async () => {
    try {
      const result = await axiosInstance("/auth/logout");
      window.location.href = "/";
      toggle();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      ref={sidebarRef}
      className="absolute left-0 top-0 z-50 h-full w-64 bg-gray-700 p-4 text-white shadow-lg md:hidden"
    >
      <nav className="flex flex-col space-y-4">
        <Link
          onClick={toggle}
          href="/"
          className="transition-colors hover:text-gray-300"
        >
          Home
        </Link>
        {isLoggedIn ? (
          <>
            <Link
              onClick={toggle}
              href="/create"
              className="transition-colors hover:text-gray-300"
            >
              Create
            </Link>
            <Link
              onClick={toggle}
              href="/my-pages"
              className="transition-colors hover:text-gray-300"
            >
              My Pages
            </Link>
            <button
              onClick={handleLogout}
              className="focus:shadow-outline w-full rounded bg-red-500 px-4 py-2 text-left font-bold text-white transition-colors hover:bg-red-700 focus:outline-none"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link
              onClick={toggle}
              href="/signin"
              className="transition-colors hover:text-gray-300"
            >
              Sign In
            </Link>
            <Link
              onClick={toggle}
              href="/signup"
              className="transition-colors hover:text-gray-300"
            >
              New User
            </Link>
          </>
        )}
        <button
          onClick={toggle}
          className="focus:shadow-outline rounded bg-gray-800 px-4 py-2 font-bold text-white transition-colors hover:bg-gray-600 focus:outline-none"
        >
          Close
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
