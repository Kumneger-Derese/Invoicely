import { Link } from "react-router-dom";
import { useAuth } from "../store/useAuthStore";
import NotificationCount from "./NotificationCount";

const Navbar = () => {
  const { userInfo } = useAuth();

  return (
    <div className="flex box-navbar justify-between bg-neutral-700 rounded-md p-3 w-full mb-4">
      <Link
        to={"/"}
        className="text-transparent bg-linear-30 text-2xl from-lime-300 via-lime-700 to-lime-300  bg-clip-text font-black"
      >
        Invoicely
      </Link>

      {userInfo && (
        <div className="flex gap-3 px-6 items-center text-neutral-300">
          <Link to={"/invoices"}>Invoices</Link>
          <Link to={"/products"}>Products</Link>
          <Link to={"/clients"}>Clients</Link>
          <Link to={"/dashboard/"}>Dashboard</Link>
        </div>
      )}

      {!userInfo ? (
        <div className="flex gap-3 px-4 items-center text-neutral-300">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      ) : (
        <div className={"flex gap-x-3 items-center"}>
          <NotificationCount />

          <Link to={"/profile"}>{userInfo?.username}</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
