import { LuChevronLeft } from "react-icons/lu";
import { Link } from "react-router-dom";

const BackButton = ({ className, to }) => {
  return (
    <Link
      to={to}
      className={`${className} flex items-center gap-1 hover:bg-neutral-700 py-1 px-2 rounded-md`}
    >
      <LuChevronLeft size={28} /> <span className="text-neutral-500">back</span>
    </Link>
  );
};

export default BackButton;
