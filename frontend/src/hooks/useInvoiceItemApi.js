import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createItem, deleteItem, getItem, getItems, updateItem} from "../api/invoiceItemApi.js";
import toast from "react-hot-toast";

//hook one item
const useGetInvoiceItem = (invoiceId, itemId) => {
    return useQuery({
        queryKey: ['items', invoiceId, itemId],
        queryFn: getItem,
        enabled: !!invoiceId
    })
}

const useGetInvoiceItems = (invoiceId) => {
    return useQuery({
        queryKey: ['items', invoiceId],
        queryFn: getItems,
        enabled: !!invoiceId
    })
}

const useCreateInvoiceItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createItem,
        onSuccess: async (data, variables) => {
            const {invoiceId} = variables
            toast.success(data.message);
            await queryClient.invalidateQueries({queryKey: ['items', invoiceId]})
        },
        onError: (error) => {
            console.log({error})
            toast.error(error?.response?.data?.message);
        }
    })
}

const useUpdateInvoiceItem = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateItem,
        onSuccess: async (data, variables) => {
            const {invoiceId, itemId} = variables
            toast.success(data.message);
            await queryClient.invalidateQueries({queryKey: ['items', invoiceId]})
            await queryClient.invalidateQueries({queryKey: ['items', invoiceId, itemId]})
        },
        onError: (error) => {
            console.log({error})
            toast.error(error?.response?.data?.message);
        }
    })
}

const useDeleteInvoiceItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteItem,
        onSuccess: async (data, variables) => {
            const {invoiceId, itemId} = variables
            toast.success(data.message);
            await queryClient.invalidateQueries({queryKey: ['items', invoiceId]})
            await queryClient.invalidateQueries({queryKey: ['items', invoiceId, itemId]})
        },
        onError: (error) => {
            console.log({error})
            toast.error(error?.response?.data?.message);
        }
    })
}

export {useGetInvoiceItem, useGetInvoiceItems, useCreateInvoiceItem, useUpdateInvoiceItem, useDeleteInvoiceItem}