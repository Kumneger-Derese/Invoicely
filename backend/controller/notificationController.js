import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

// get all notifications
const getNotifications = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  if (!notifications) {
    return res.status(200).json([]);
  }

  res.status(200).json(notifications);
});

// Get notifications count in number.
const getNotificationsCount = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const count = await prisma.notification.findMany({
    where: { userId, read: false },
  });

  return res.status(200).json(count.length);
});

// Read one notification
const readNotification = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { notificationId } = req.params;

  const notification = await prisma.notification.findUnique({
    where: { id: notificationId, userId },
  });

  if (!notification)
    return next(new ApiError("Notification to read not found", 404));

  const notificationUpdate = await prisma.notification.update({
    where: { id: notificationId, userId },
    data: { read: true },
  });

  console.log("notificationUpdate:", notificationUpdate);

  res.status(200).json({
    message: "Notification viewed.",
  });
});

//✅ read all notifications
const readNotifications = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const notifications = await prisma.notification.updateMany({
    where: { userId },
    data: { read: true },
  });

  const count = notifications.count;

  res.status(200).json({
    message: `All notifications read (${count}).`,
  });
});

//delete notification
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

//✅ delete all notifications
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
