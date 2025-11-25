import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createClient,
  deleteClient,
  getClient,
  updateClient,
} from "../api/clientApi";
import toast from "react-hot-toast";

//* hook to get specific user
const useGetClient = (clientId) => {
  return useQuery({
    queryKey: ["clients", clientId],
    queryFn: () => getClient(clientId),
    enabled: !!clientId,
  });
};

//* hook to get all users
const useGetClients = (clientId) => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => getClient(clientId),
    enabled: !!clientId,
  });
};

//* hook to create user
const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClient,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
      console.log({ error });
    },
  });
};

//* hook to update user
const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateClient,
    onSuccess: (data, variables) => {
      const { clientId } = variables;
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["clients", clientId] });
    },
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
      console.log({ error });
    },
  });
};

//* hook to delete user
const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClient,
    onSuccess: (data, variables) => {
      const { clientId } = variables;
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["clients", clientId] });
    },
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
      console.log({ error });
    },
  });
};

export {
  useGetClient,
  useGetClients,
  useCreateClient,
  useUpdateClient,
  useDeleteClient,
};
