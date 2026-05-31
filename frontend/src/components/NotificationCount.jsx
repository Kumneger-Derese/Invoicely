import { Link } from "react-router-dom";
import { HiOutlineBell } from "react-icons/hi2";
import { useGetNotificationsCount } from "../hooks/useNotificationApi.js";

const NotificationCount = () => {
  const { data: notificationCount } = useGetNotificationsCount();

  return (
    <Link
      to={"/notification"}
      className="text-neutral-300 relative hover:text-lime-500"
      title="Notification"
    >
      <HiOutlineBell size={28} />
      <span
        className="absolute -top-2 -right-2 text-xs font-bold p-0.5 size-5 flex items-center justify-center
                             rounded-full bg-lime-300 text-neutral-950"
      >
        {notificationCount}
      </span>
    </Link>
  );
};

export default NotificationCount;
