import { Link } from "react-router-dom";
import {
  LuGalleryVerticalEnd,
  LuLogOut,
  LuLogs,
  LuRainbow,
  LuSettings2,
} from "react-icons/lu";
import { useAuth } from "../../store/useAuthStore";
import { HiOutlineHome } from "react-icons/hi2";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col justify-between h-full gap-4 text-neutral-900">
      <Link to={"/"} className="text-2xl h-1/6  font-bold mb-8">
        Invoicely
      </Link>

      <ul className="flex flex-col gap-3 h-4/6  font-medium text-lg">
        <Link to={"/"} className="flex gap-x-2 items-center">
          <HiOutlineHome strokeWidth={2.1} size={24} />
          <span>Home</span>
        </Link>

        <Link to={"/dashboard"} className="flex gap-x-2 items-center">
          <LuGalleryVerticalEnd strokeWidth={2.1} size={24} />
          <span>Feed</span>
        </Link>

        <Link to={"/dashboard/recent"} className="flex gap-x-2 items-center">
          <LuLogs strokeWidth={2.1} size={24} />
          <span>Recent</span>
        </Link>

        <Link to={"/dashboard/settings"} className="flex gap-x-2 items-center">
          <LuSettings2 s strokeWidth={2.1} size={24} />
          <span>Settings</span>
        </Link>

        <Link to={"/notification"} className="flex gap-x-2 items-center">
          <LuRainbow strokeWidth={2.1} size={24} />
          <span>Notifications</span>
        </Link>
      </ul>

      <button
        onClick={logout}
        className="h-1/6 font-semibold text-lg flex gap-x-2 cursor-pointer"
      >
        <LuLogOut strokeWidth={2.1} size={24} />
        <span className="text-red-950">Logout</span>
      </button>
    </div>
  );
};
export default Sidebar;
