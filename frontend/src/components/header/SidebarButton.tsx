"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import LoadingIndicator from "../LoadingIndicator";

export const SidebarButton = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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
      />
    </>
  );
};
