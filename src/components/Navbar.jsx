import logo from "../assets/Singleview_logo.png";
import { Menu } from "lucide-react"; // Hamburger icon

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="w-full bg-white shadow flex items-center justify-between px-2 h-16">
      <div className="flex items-center ">
        {/* Hamburger */}
        <button onClick={toggleSidebar} className="p-2 hover:bg-gray-200 rounded">
          <Menu size={24} />
        </button>

        {/* Logo */}
        <img src={logo} alt="logo" className="h-23 w-auto object-contain " />
      </div>

      {/* Right side (optional) */}
      <div>
        {/* Add other nav items here if needed */}
      </div>
    </div>
  );
};

export default Navbar;