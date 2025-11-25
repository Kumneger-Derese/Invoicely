import axiosInstance from "../utils/axiosInstance";

const getClient = async (clientId) => {
  const { data } = await axiosInstance.get(`/clients/${clientId}`);
  return data;
};

const getClients = async () => {
  const { data } = await axiosInstance.get(`/clients`);
  return data;
};

const createClient = async (body) => {
  const { data } = await axiosInstance.post(`/clients/create`, body);
  return data;
};

const updateClient = async ({ clientId, body }) => {
  const { data } = await axiosInstance.put(`/clients/update/${clientId}`, body);
  return data;
};

const deleteClient = async (clientId) => {
  const { data } = await axiosInstance.delete(`/clients/delete/${clientId}`);
  return data;
};

export { getClient, getClients, createClient, updateClient, deleteClient };
