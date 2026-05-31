import { asyncHandler } from "../middleware/asyncHandler.js";
import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/apiError.js";
import NotificationService from "../services/notificationService.js";


//get one client
const getClient = asyncHandler(async (req, res, next) => {
  const { clientId } = req.params;
  const userId = req.user.id;

  const client = await prisma.client.findUnique({
    where: { id: clientId, userId: userId },
    include: {
      user: {
        omit: { password: true, createdAt: true, updatedAt: true },
      },
    },
  });

  if (!client) return next(new ApiError("Client not found", 404));

  res.status(200).json(client);
});

//get all clients
const getClients = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const clients = await prisma.client.findMany({
    where: { userId: userId },
    include: {
      user: {
        omit: { password: true, createdAt: true, updatedAt: true },
      },
    },
  });

  if (!clients) return [];

  res.status(200).json(clients);
});

// create client
const createClient = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { name, email, phone, address } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return next(new ApiError("User not found.", 404));

  const client = await prisma.client.create({
    data: { name, email, phone, address, userId },
  });

  if (!client) return next(new ApiError("Client not created.", 400));

  //Todo: Send notification later
  const notification = await NotificationService.createNotification({
    userId,
    title: 'Client created',
    message: `Client created for user ${user.username}.`,
    type: 'success',
    next
  })

  res.status(201).json({
    message: "Client created.",
    notification
  });
});

// update client
const updateClient = asyncHandler(async (req, res, next) => {
  const data = {};
  const userId = req.user.id;
  const { clientId } = req.params;
  const { name, email, phone, address } = req.body;

  const user = await prisma.user.findUnique({ where: { id: userId } })

  const client = await prisma.client.findUnique({
    where: { id: clientId, userId: userId },
  });

  if (!client) return next(new ApiError("Client to update not found.", 404));

  if (name) data.name = name;
  if (email) data.email = email;
  if (phone) data.phone = phone;
  if (address) data.address = address;

  const updatedClient = await prisma.client.update({
    where: { id: clientId, userId: userId },
    data,
  });

  if (!updatedClient) return next(new ApiError("Client not updated.", 400));

  const notification = await NotificationService.createNotification({
    userId,
    title: 'Client updated',
    message: `Client updated by user ${user.username}.`,
    type: 'warning',
    next
  })

  res.status(200).json({
    message: "Client updated.",
    notification
  });
});

// delete client
const deleteClient = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { clientId } = req.params;

  const user = await prisma.user.findUnique({ where: { id: userId } })

  const client = await prisma.client.findUnique({
    where: { id: clientId, userId: userId },
  });

  if (!client) return next(new ApiError("Client to delete not found.", 404));

  await prisma.client.delete({
    where: { id: clientId, userId: userId },
  });

  const notification = await NotificationService.createNotification({
    userId,
    title: 'Client deleted',
    message: `Client deleted by user ${user.username}.`,
    type: 'warning',
    next
  })

  res.status(200).json({
    message: "Client deleted.",
    notification
  });
});

export { getClient, getClients, deleteClient, createClient, updateClient };
