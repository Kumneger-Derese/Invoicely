import { prisma } from '../config/prisma.js'
import { ApiError } from '../utils/apiError.js'

// create notification
const createNotification = async ({ title, message, type, userId, next }) => {
  const notification = await prisma.notification.create({
    data: { title, message, type, userId }
  })

  if (!notification) return next(new ApiError('Notification not created.', 404))

  return notification
}

// get one notification
const getNotification = async ({ userId, notificationId, next }) => {
  const notification = await prisma.notification.findUnique({
    where: { id: notificationId, userId }
  })

  if (!notification) return next(new ApiError('Notification not found.', 404))

  return notification
}

const notificationService = {
  createNotification,
  getNotification
}

export default notificationService
