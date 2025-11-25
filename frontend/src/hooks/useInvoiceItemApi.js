import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInvoiceItem,
  deleteInvoiceItem,
  getInvoiceItem,
  updateInvoiceItem,
} from "../api/invoiceItemApi";
import toast from "react-hot-toast";

// get specific invoice item
const useGetInvoiceItem = (invoiceItemId) => {
  return useQuery({
    queryKey: ["items", invoiceItemId],
    queryFn: () => getInvoiceItem(invoiceItemId),
    enabled: !!invoiceItemId,
  });
};

// get all invoice item
const useGetInvoiceItems = (invoiceId) => {
  return useQuery({
    queryKey: ["items", invoiceId],
    queryFn: () => getInvoiceItem(invoiceId),
    enabled: !!invoiceId,
  });
};

// create invoice item
const useCreateInvoiceItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInvoiceItem,
    onSuccess: (data, variables) => {
      const { invoiceId } = variables;
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["items", invoiceId] });
    },
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
      console.log({ error });
    },
  });
};

// update invoice item
const useUpdateInvoiceItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateInvoiceItem,
    onSuccess: (data, variables) => {
      const { invoiceItemId } = variables;
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({ queryKey: ["items", invoiceItemId] });
    },
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
      console.log({ error });
    },
  });
};

// update invoice item
const useDeleteInvoiceItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInvoiceItem,
    onSuccess: (data, variables) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["items"] });
      queryClient.invalidateQueries({
        queryKey: ["items", variables.invoiceItemId],
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.message;
      toast.error(message);
      console.log({ error });
    },
  });
};

export {
  useGetInvoiceItem,
  useGetInvoiceItems,
  useCreateInvoiceItem,
  useUpdateInvoiceItem,
  useDeleteInvoiceItem,
};
