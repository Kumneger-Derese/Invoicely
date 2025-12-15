import { asyncHandler } from "../middleware/asyncHandler.js";
import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/apiError.js";

// notification count
const getNotificationsCount = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const count = await prisma.notification.count({
    where: { read: false, userId },
  });

  if (!count) return [];

  console.log({ count });

  res.status(200).json(count);
});

// read notification
const readNotification = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { notificationId } = req.params;

  const notification = await prisma.notification.findUnique({
    where: { id: notificationId, userId },
  });

  if (!notification)
    return next(new ApiError("Notification to read not found", 404));

  await prisma.notification.update({
    where: { id: notificationId, userId },
    data: { read: true },
  });

  res.status(200).json({
    message: "Notification viewed.",
  });
});

// read all notifications
const readNotifications = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const notificationCount = await prisma.notification.updateMany({
    where: { userId },
    data: { read: true },
  });

  res.status(200).json({
    message: "Notifications viewed.",
    count: notificationCount.count,
  });
});

// get all notifications
const getNotifications = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const notifications = await prisma.notification.findMany({
    where: { userId },
    include: {
      user: {
        select: { id: true, username: true, email: true },
      },
    },
  });

  if (!notifications) return [];

  const unreadCount = notifications.filter((n) => n.read === true).length;

  res.status(200).json({ notifications, unreadCount });
});

// delete notification
const deleteNotification = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { notificationId } = req.params;

  const notification = await prisma.notification.findUnique({
    where: { id: notificationId, userId },
  });

  if (!notification)
    return next(new ApiError("Notification to delete not found.", 404));

  const delNotification = await prisma.notification.delete({
    where: { id: notificationId, userId },
  });

  res.status(200).json({ message: "Notification deleted.", delNotification });
});

// delete all notifications
const deleteNotifications = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const deletedNotifications = await prisma.notification.deleteMany({
    where: { userId },
  });

  res.status(200).json({
    message: `All notifications have been deleted.`,
    count: deletedNotifications.count,
  });
});

export {
  getNotifications,
  deleteNotifications,
  deleteNotification,
  readNotification,
  readNotifications,
  getNotificationsCount,
};
