import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteNotification,
  deleteNotifications,
  fetchNotifications,
  fetchNotificationsCount,
  readNotification,
  readNotifications,
} from "../api/notificationApi";
import toast from "react-hot-toast";

// get all notifications
const useGetNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });
};

// get notification count
const useGetNotificationsCount = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotificationsCount,
  });
};

//read single notification
const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readNotification,

    onSuccess: (data, variables) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["notifications", variables.notificationId],
      });
    },

    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });
};

//read  all notification
const useReadNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readNotifications,

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },

    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });
};

//delete single notification
const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,

    onSuccess: (data, variables) => {
      console.log("useDeleteNotification", variables);

      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["notifications", variables.notificationId],
      });
    },

    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });
};

//read delete all notification
const useDeleteNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotifications,

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },

    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });
};

export {
  useGetNotifications,
  useReadNotification,
  useReadNotifications,
  useDeleteNotification,
  useDeleteNotifications,
  useGetNotificationsCount,
};
