"use client"
import { useState } from "react";
import Sidebar from "./Sidebar";
import LoadingIndicator from "./LoadingIndicator";
import { useAuth } from "../services/queries";

export const SidebarButton = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data, isLoading, error } = useAuth();

  if (isLoading) return <LoadingIndicator />;
  if (error)
    return (
      <div className="text-center text-red-600">Failed to load user data.</div>
    );

  const isLoggedIn = data?.isAuthenticated;

  return (
    <>
      <button
        className="rounded-md bg-gray-700 px-2 py-1 transition-colors hover:bg-gray-600 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen(false)}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
};