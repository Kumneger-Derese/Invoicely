import axiosInstance from "../utils/axiosInstance";

const getInvoice = async (invoiceId) => {
  const { data } = await axiosInstance.get(`/invoices/invoice/${invoiceId}`);
  return data;
};

const getInvoices = async () => {
  const { data } = await axiosInstance.get(`/invoices`);
  return data;
};

const createInvoice = async ({ clientId, body }) => {
  const { data } = await axiosInstance.post(
    `/invoices/create/${clientId}`,
    body
  );
  return data;
};

const updateInvoice = async ({ body, invoiceId }) => {
  const { data } = await axiosInstance.put(
    `/invoices/update/${invoiceId}`,
    body
  );
  return data;
};

const deleteInvoice = async (invoiceId) => {
  const { data } = await axiosInstance.delete(`/invoices/delete/${invoiceId}`);
  return data;
};

export { getInvoice, getInvoices, createInvoice, updateInvoice, deleteInvoice };
