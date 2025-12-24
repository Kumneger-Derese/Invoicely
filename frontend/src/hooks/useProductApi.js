import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createProduct, deleteProduct, getProduct, getProducts, updateProduct,} from "../api/productApi.js";
import toast from "react-hot-toast";

// get specific products
const useGetProduct = (productId) => {
    return useQuery({
        queryKey: ["products", productId],
        queryFn: () => getProduct(productId),
        enabled: !!productId,
    });
};

// get all products
const useGetProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });
};

// create product
const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,
        onSuccess: async (data) => {
            toast.success(data.message);
            await queryClient.invalidateQueries({queryKey: ['products']});
        },
        onError: (error) => {
            const message = error?.response?.data?.message;
            toast.error(message);
            console.log({error});
        },
    });
};

// update product
const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProduct,
        onSuccess: async (data, variables) => {
            const {productId} = variables;
            toast.success(data.message);
            await queryClient.invalidateQueries({queryKey: ["products"]});
            await queryClient.invalidateQueries({queryKey: ["products", productId]});
        },
        onError: (error) => {
            const message = error?.response?.data?.message;
            toast.error(message);
            console.log({error});
        },
    });
};

// update invoice product
const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: async (data, variables) => {
            toast.success(data.message);
            await queryClient.invalidateQueries({queryKey: ["products"]});
            await queryClient.invalidateQueries({
                queryKey: ["products", variables.productId],
            });
        },
        onError: (error) => {
            const message = error?.response?.data?.message;
            toast.error(message);
            console.log({error});
        },
    });
};

export {
    useGetProduct,
    useGetProducts,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
};
