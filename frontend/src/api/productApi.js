import axiosInstance from "../utils/axiosInstance";

const getProduct = async (productId) => {
    const {data} = await axiosInstance.get(`/products/${productId}`);
    return data;
};

const getProducts = async () => {
    const {data} = await axiosInstance.get(`/products`);
    return data;
};

const createProduct = async ({body}) => {
    const {data} = await axiosInstance.post(`/products/create`, body);
    return data;
};

const updateProduct = async ({productId, body}) => {
    const {data} = await axiosInstance.put(
        `/products/update/${productId}`,
        body
    );
    return data;
};

const deleteProduct = async (productId) => {
    const {data} = await axiosInstance.delete(`/products/delete/${productId}`);
    return data;
};

export {
   getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
