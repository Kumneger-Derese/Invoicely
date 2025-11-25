import axiosInstance from "../utils/axiosInstance";

const getInvoiceItem = async (invoiceItemId) => {
  const { data } = await axiosInstance.get(`/items/item/${invoiceItemId}`);
  return data;
};

const getInvoiceItems = async (invoiceId) => {
  const { data } = await axiosInstance.get(`/items/${invoiceId}`);
  return data;
};

const createInvoiceItem = async ({ invoiceId, body }) => {
  const { data } = await axiosInstance.post(`/items/create/${invoiceId}`, body);
  return data;
};

const updateInvoiceItem = async ({ invoiceItemId, body }) => {
  const { data } = await axiosInstance.put(
    `/items/update/${invoiceItemId}`,
    body
  );
  return data;
};

const deleteInvoiceItem = async (invoiceItemId) => {
  const { data } = await axiosInstance.delete(`/items/delete/${invoiceItemId}`);
  return data;
};

export {
  getInvoiceItem,
  getInvoiceItems,
  createInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem,
};
