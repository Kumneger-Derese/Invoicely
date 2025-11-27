import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteNotification,
  deleteNotifications,
  getNotifications,
  readNotification,
  readNotifications,
} from "../api/notificationApi";
import toast from "react-hot-toast";

const useGetNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
};

//read single notification
const useReadNotification = (notificationId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readNotification,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications", notificationId],
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
      console.log({ error });
    },
  });
};

//read single all notification
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
      console.log({ error });
    },
  });
};

//delete single notification
const useDeleteNotification = (notificationId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotification,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({
        queryKey: ["notifications", notificationId],
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
      console.log({ error });
    },
  });
};

//read delete single all notification
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
      console.log({ error });
    },
  });
};

export {
  useGetNotifications,
  useReadNotification,
  useReadNotifications,
  useDeleteNotification,
  useDeleteNotifications,
};
