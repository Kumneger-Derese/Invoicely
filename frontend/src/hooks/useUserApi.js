import toast from "react-hot-toast";
import {
  deleteProfile,
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
} from "../api/userApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../store/useAuthStore";

//* Get user Profile or details
const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getProfile,
  });
};

//* Register User
const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const { setCredential } = useAuth();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setCredential(data);
      toast.success("User registered.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.log({ error });
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });
};

//* Login User
const useLoginUser = () => {
  const queryClient = useQueryClient();
  const { setCredential } = useAuth();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setCredential(data);
      toast.success("Logged in!");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.log({ error });
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });
};

//* Update Profile
const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { setCredential } = useAuth();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      setCredential(data);
      toast.success("Profile up to date.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.log({ error });
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });
};

//* Delete user Account
const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: () => {
      logout();
      toast.success("Account deleted.");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      console.log({ error });
      const message = error?.response?.data?.message;
      toast.error(message);
    },
  });
};

export {
  useRegisterUser,
  useLoginUser,
  useUpdateProfile,
  useDeleteAccount,
  useGetUserProfile,
};
