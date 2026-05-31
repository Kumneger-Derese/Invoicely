import {
  useDeleteNotification,
  useDeleteNotifications,
  useGetNotifications,
  useReadNotification,
  useReadNotifications,
} from "../hooks/useNotificationApi";

import Loading from "../components/Loading";
import BackButton from "../components/BackButton";
import EmptySection from "../components/EmptySection";

const NotificationPage = () => {
  // Get notification
  const { data: notifications, isLoading } = useGetNotifications(); // data

  // Update notification
  const readNotificationMutation = useReadNotification();
  const readNotificationMutations = useReadNotifications();

  // Delete notification
  const deleteNotificationMutation = useDeleteNotification();
  const deleteNotificationMutations = useDeleteNotifications();

  //* read and delete handlers
  const handleReadNotification = (id) => {
    readNotificationMutation.mutate(id);
  };

  const handleReadNotifications = () => {
    readNotificationMutations.mutate();
  };

  const handleDeleteNotification = (id) => {
    deleteNotificationMutation.mutate(id);
  };

  const handleDeleteNotifications = () => {
    deleteNotificationMutations.mutate();
  };

  // Loading spinner
  if (isLoading) {
    return <Loading />;
  }

  const isAllNotificationRead = notifications?.map((d) => d.read === true);
  const allRead = isAllNotificationRead?.every((d) => d === true);

  return (
    <div className="flex flex-col gap-8">
      {/* Links */}
      <div className="text-center flex flex-col gap-2 items-center p-8 relative">
        {/* Back btn */}
        <BackButton className={"absolute top-8 left-2"} to={"/invoices"} />

        <h1 className=" font-bold text-2xl text-lime-200">Notifications</h1>

        <div className="flex items-center gap-x-2">
          <button
            onClick={handleReadNotifications}
            disabled={allRead}
            title="Read all notification"
            className="px-2 py-0.5 rounded-md disabled:bg-neutral-400 bg-lime-800"
          >
            Mark all read
          </button>

          <button
            onClick={handleDeleteNotifications}
            disabled={notifications?.length === 0}
            title="Delete all notification"
            className="px-2 py-0.5 rounded-md disabled:bg-neutral-400 bg-red-800/50"
          >
            Delete all
          </button>
        </div>
      </div>

      {/* List Notifications */}
      <div className="flex flex-col gap-2 mb-8">
        {notifications?.length === 0 ? (
          <div className="pl-32">
            <EmptySection
              title={"Notifications not found"}
              description={
                "Hey, you have no notifications yet or you deleted all of them."
              }
            />
          </div>
        ) : (
          notifications?.map((notification) => (
            <div
              key={notification?.id}
              className="mx-4 sm:mx-40 rounded-md p-4 box hover:bg-lime-900 transition-colors duration-300 flex flex-col sm:flex-row gap-2 justify-between hover:border-lime-600 bg-neutral-700 border border-neutral-500 relative"
            >
              <div className="w-4/5">
                <h2
                  style={{
                    color:
                      notification?.type === "success"
                        ? "lightgreen"
                        : "orange",
                  }}
                  className="font-bold text-xl capitalize"
                >
                  {notification?.type}
                </h2>
                <h3>{notification?.title}</h3>
                <p>{notification?.message}</p>
              </div>

              {/* New badge */}
              {!notification?.read && (
                <button className="absolute text-sm top-2 right-2 bg-lime-800 border border-lime-400 text-lime-200 rounded-xl px-2 py-0.5">
                  new
                </button>
              )}

              {/* Action Button Group */}
              <div className="w-full sm:w-2/5 mt-4 flex items-center sm:justify-center gap-2">
                <button
                  onClick={() => handleReadNotification(notification?.id)}
                  disabled={notification?.read}
                  className="bg-neutral-600 text-neutral-200 rounded-xl p-2 hover:bg-lime-600"
                >
                  {notification?.read ? "Seen" : "Read"}
                </button>

                <button
                  onClick={() => handleDeleteNotification(notification?.id)}
                  className="bg-red-900 text-neutral-200 rounded-xl p-2 hover:bg-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
