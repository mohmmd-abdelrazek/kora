import Link from 'next/link';
import { axiosInstance } from '../services/fetcher';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
  isLoggedIn: boolean;
}

const Sidebar = ({ isOpen, toggle, isLoggedIn } : SidebarProps) => {
  if (!isOpen) return null;
  const handleLogout = async () => {
    try {
      const result = await axiosInstance("/auth/logout");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="md:hidden bg-gray-700 text-white p-4 absolute top-0 left-0 h-full w-64 z-50 shadow-lg">
      <nav className="flex flex-col space-y-4">
        <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
        {isLoggedIn ? (
          <>
            <Link href="/create" className="hover:text-gray-300 transition-colors">Create</Link>
            <Link href="/my-pages" className="hover:text-gray-300 transition-colors">My Pages</Link>
            <button onClick={handleLogout} className="text-left w-full bg-red-500 hover:bg-red-700 transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Log Out</button>
          </>
        ) : (
          <>
            <Link href="/signin" className="hover:text-gray-300 transition-colors">Sign In</Link>
            <Link href="/signup" className="hover:text-gray-300 transition-colors">New User</Link>
          </>
        )}
        <button onClick={toggle} className="bg-gray-800 hover:bg-gray-600 transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Close</button>
      </nav>
    </div>
  );
};

export default Sidebar;
