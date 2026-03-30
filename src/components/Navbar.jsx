import logo from "../assets/Singleview_logo.png";
import { Menu, Bell, ChevronDown } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="w-full bg-white shadow-sm border-b flex items-center justify-between px-4 h-14">
      <div className="flex items-center gap-1">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle sidebar"
        >
          <Menu size={22} className="text-gray-600" />
        </button>
        <img src={logo} alt="Single View" className="h-16 w-auto object-contain" />
      </div>

      <div className="flex items-center gap-5">
        {/* Quick Links */}
        <button className="flex items-center gap-1.5 border border-gray-300 rounded-full px-3.5 py-1 text-sm text-gray-600 hover:bg-gray-50">
          Quick links
          <ChevronDown size={14} />
        </button>

        {/* Arabic Toggle */}
        <span className="text-sm text-gray-600 cursor-pointer hover:text-gray-800 font-medium">
          عربي
        </span>

        {/* Notification Bell */}
        <button className="relative p-1.5 hover:bg-gray-100 rounded-lg" aria-label="Notifications">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
            UN
          </div>
          <span className="text-sm text-gray-700 max-w-[100px] truncate">
            User Name
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
