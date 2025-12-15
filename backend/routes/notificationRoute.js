import { Router } from "express";
import { protect } from "../middleware/protect.js";
import {
  deleteNotification,
  deleteNotifications,
  getNotifications,
  readNotification,
  readNotifications,
  getNotificationsCount,
} from "../controller/notificationController.js";

const notificationRouter = Router();

notificationRouter.use(protect);

notificationRouter.get("/", getNotifications);
notificationRouter.get("/count", getNotificationsCount);
notificationRouter.patch("/read/:notificationId", readNotification);
notificationRouter.patch("/read-all", readNotifications);
notificationRouter.delete("/delete/:notificationId", deleteNotification);
notificationRouter.delete("/delete-all", deleteNotifications);

export { notificationRouter };
