import axiosInstance from "../utils/axiosInstance";

const getNotificationsCount = async () => {
  const { data } = await axiosInstance.get("/notifications/count");
  return data;
};

const getNotifications = async () => {
  const { data } = await axiosInstance.get("/notifications");
  return data;
};

const readNotification = async (notificationId) => {
  const { data } = await axiosInstance.patch(
    `/notifications/read/${notificationId}`
  );
  return data;
};

const readNotifications = async () => {
  const { data } = await axiosInstance.patch(`/notifications/read-all`);
  return data;
};

const deleteNotification = async (notificationId) => {
  const { data } = await axiosInstance.delete(
    `/notifications/delete/${notificationId}`
  );
  return data;
};

const deleteNotifications = async () => {
  const { data } = await axiosInstance.delete(`/notifications/delete-all`);
  return data;
};
export {
  getNotifications,
  readNotification,
  readNotifications,
  deleteNotification,
  deleteNotifications,
  getNotificationsCount,
};
