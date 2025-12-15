import { useDeleteNotification, useDeleteNotifications, useGetNotifications, useGetNotificationsCount, useReadNotification, useReadNotifications } from "../hooks/useNotificationApi"
import Loading from '../components/Loading'

const NotificationPage = () => {
    const { data, isLoading, isError, error } = useGetNotifications()
    const readNotificationMutation = useReadNotification()
    const readNotificationMutations = useReadNotifications()
    const deleteNotificationMutation = useDeleteNotification()
    const deleteNotificationMutations = useDeleteNotifications()
    const { data: notificationCount } = useGetNotificationsCount()

    console.log(notificationCount)

    if (isLoading) {
        return <Loading />
    }

    if (isError)
        return <div className="h-screen flex items-center justify-center">
            {error.message}
        </div>

    const handleReadNotification = (id) => {
        readNotificationMutation.mutate(id)
    }
    const handleReadNotifications = () => {
        readNotificationMutations.mutate()
    }

    const handleDeleteNotification = (id) => {
        deleteNotificationMutation.mutate(id)
    }

    const handleDeleteNotifications = () => {
        deleteNotificationMutations.mutate()
    }

    const readNotificationBtnText = readNotificationMutation.isPending ? 'Processing' : ' Mark read'
    const deleteNotificationBtnText = deleteNotificationMutation.isPending ? 'Processing' : ' Delete'

    return (
        <div className="flex flex-col gap-8">
            <div className="text-center flex flex-col gap-2 items-center p-8">
                <h1 className=" font-bold text-2xl text-lime-200">Notifications</h1>

                <div className="flex items-center gap-x-2">
                    <button onClick={handleReadNotifications}
                        disabled={notificationCount === 0}
                        title="Read all notification"
                        className="px-2 py-0.5 rounded-md bg-lime-800">
                        Mark all read
                    </button>
                    <button onClick={handleDeleteNotifications}
                        disabled={data?.notifications?.length === 0}
                        title="Delete all notification"
                        className="px-2 py-0.5 rounded-md bg-red-800/50">
                        Delete all
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-2 mb-8">
                {data?.notifications?.length === 0 ? (
                    <div className="h-full flex m-auto items-center justify-center">
                        <p className="text-2xl font-bold text-neutral-400">There is No Notifications.</p>
                    </div>
                ) :
                    data?.notifications?.map((notification) => (
                        <div key={notification.id} className="mx-40 rounded-md p-4 hover:bg-lime-900 transition-colors duration-300 flex gap-2 justify-between
                        hover:border-lime-600 bg-neutral-700 border border-neutral-500">
                            <div className="w-4/5">
                                <h2 className="font-bold text-xl text-green-400">{(notification?.type)}</h2>
                                <h3>{notification?.title}</h3>
                                <p>{notification?.message}</p>
                            </div>

                            <div className="w-2/5 relative flex items-center gap-2">
                                <button
                                    onClick={() => handleReadNotification(notification?.id)}
                                    disabled={notification.read}
                                    className="bg-neutral-600 text-neutral-200 rounded-xl p-2 hover:bg-lime-600">
                                    {readNotificationBtnText}
                                </button>

                                <button
                                    onClick={() => handleDeleteNotification(notification?.id)}
                                    className="bg-red-900 text-neutral-200 rounded-xl p-2 hover:bg-red-800">
                                    {deleteNotificationBtnText}
                                </button>

                                {/* New Icon */}
                                {
                                    !notification?.read ?
                                        (<p className="absolute top-0 right-0 bg-lime-600 border border-lime-400 rounded-xl px-2 py-0.5">
                                            new
                                        </p>) : ''
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default NotificationPage