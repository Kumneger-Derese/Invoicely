import axiosInstance from "../utils/axiosInstance";

const fetchNotificationsCount = async () => {
  const { data } = await axiosInstance.get("/notifications/count");
  return data;
};

const fetchNotifications = async () => {
  const { data } = await axiosInstance.get("/notifications/all");
  return data;
};

const readNotification = async (notificationId) => {
  const { data } = await axiosInstance.put(
    `/notifications/read/${notificationId}`,
  );
  return data;
};

const readNotifications = async () => {
  const { data } = await axiosInstance.put(`/notifications/read-all`);
  return data;
};

const deleteNotification = async (notificationId) => {
  const { data } = await axiosInstance.delete(
    `/notifications/delete/${notificationId}`,
  );
  return data;
};

const deleteNotifications = async () => {
  const { data } = await axiosInstance.delete(`/notifications/delete-all`);
  return data;
};

export {
  fetchNotifications,
  readNotification,
  readNotifications,
  deleteNotification,
  deleteNotifications,
  fetchNotificationsCount,
};
