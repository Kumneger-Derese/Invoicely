import axiosInstance from "../utils/axiosInstance.js";


const getItem = async (invoiceId, itemId) => {
    const {data} = await axiosInstance.get(`/items/${invoiceId}/${itemId}`)
    return data
}

const getItems = async (invoiceId) => {
    const {data} = await axiosInstance.get(`/items/${invoiceId}}`)
    return data
}

const createItem = async ({invoiceId, body}) => {
    const {data} = await axiosInstance.post(`/items/create/${invoiceId}`, body)
    return data
}

const updateItem = async ({invoiceId, itemId, body}) => {
    const {data} = await axiosInstance.put(`/items/update/${invoiceId}/${itemId}`, body)
    return data
}

const deleteItem = async (invoiceId, itemId) => {
    const {data} = await axiosInstance.delete(`/items/delete/${invoiceId}/${itemId}`)
    return data
}

export {getItem, getItems, createItem, updateItem, deleteItem}