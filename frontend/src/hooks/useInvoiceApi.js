import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createInvoice, deleteInvoice, getInvoice, getInvoices, updateInvoice, } from "../api/invoiceApi";
import toast from "react-hot-toast";

//get invoice
const useGetInvoice = (invoiceId) => {
    return useQuery({
        queryKey: ["invoices", invoiceId],
        queryFn: () => getInvoice(invoiceId),
        enabled: !!invoiceId,
    });
};

//get invoices
const useGetInvoices = () => {
    return useQuery({
        queryKey: ["invoices"],
        queryFn: getInvoices,
    });
};

// create invoice
const useCreateInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createInvoice,
        onSuccess: async (data) => {
            const { invoiceId } = data;
            toast.success(data.message);
            await queryClient.invalidateQueries({ queryKey: ["invoices"] });
            await queryClient.invalidateQueries({ queryKey: ["invoices", invoiceId] });
        },
        onError: (error) => {
            const message = error?.response?.data?.message;
            toast.error(message);
        },
    });
};

//update invoice
const useUpdateInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateInvoice,
        onSuccess: async (data, variables) => {
            const { invoiceId } = variables;
            await queryClient.invalidateQueries({ queryKey: ["invoices"] });
            await queryClient.invalidateQueries({ queryKey: ["invoices", invoiceId] });
            toast.success(data.message);
        },
        onError: (error) => {
            const message = error?.response?.data?.message;
            toast.error(message);
        },
    });
};

// delete invoice
const useDeleteInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteInvoice,
        onSuccess: async (data, variables) => {
            const { invoiceId } = variables;
            await queryClient.invalidateQueries({ queryKey: ["invoices"] });
            await queryClient.invalidateQueries({ queryKey: ["invoices", invoiceId] });
            toast.success(data.message);
        },
        onError: (error) => {
            const message = error?.response?.data?.message;
            toast.error(message);
        },
    });
};


export {
    useGetInvoice,
    useGetInvoices,
    useCreateInvoice,
    useUpdateInvoice,
    useDeleteInvoice,
};
