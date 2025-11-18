import { asyncHandler } from '../middleware/asyncHandler.js'
import { prisma } from '../config/prisma.js'
import { ApiError } from '../utils/apiError.js'
import NotificationService from '../services/notificationService.js'

//get one invoice
const getInvoice = asyncHandler(async (req, res, next) => {
  const userId = req.user.id
  const { invoiceId } = req.params

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId, userId: userId },
    include: {
      invoiceItems: {
        omit: { createdAt: true, updatedAt: true }
      }
    }
  })

  if (!invoice) return next(new ApiError('Invoice not found', 404))

  res.status(200).json(invoice)
})

// get all invoices
const getInvoices = asyncHandler(async (req, res, next) => {
  const userId = req.user.id
  const { clientId } = req.params

  const client = await prisma.client.findUnique({
    where: { id: clientId, userId: userId }
  })

  if (!client)
    return next(new ApiError('Client to send invoice not found', 404))

  const invoices = await prisma.invoice.findMany({
    where: { clientId, userId },
    include: {
      invoiceItems: {
        omit: { createdAt: true, updatedAt: true }
      }
    }
  })

  if (!invoices) return []

  res.status(200).json(invoices)
})

// create invoice
const createInvoice = asyncHandler(async (req, res, next) => {
  const userId = req.user.id
  const { clientId } = req.params
  const {
    invoiceNumber,
    status,
    totalAmount,
    notes,
    currency,
    issueDate,
    dueDate,
    subTotal,
    taxRate,
    discountRate,
    title
  } = req.body

  const client = await prisma.client.findUnique({
    where: { id: clientId, userId: userId }
  })

  if (!client) next(new ApiError('Client to send invoice is not found', 404))

  const invoice = await prisma.invoice.create({
    data: {
      invoiceNumber,
      status,
      title,
      totalAmount,
      notes,
      userId,
      clientId,
      currency,
      issueDate,
      dueDate,
      subTotal,
      taxRate,
      discountRate
    }
  })

  if (!invoice) next(new ApiError('Invoice not created,', 400))

  // Todo: Send Notification here
  const notification = await NotificationService.createNotification({
    userId: invoice.userId,
    type: 'success',
    title: 'Invoice Created',
    message: `Invoice ${invoiceNumber} created for client ${client.name}.`,
    next
  })

  res
    .status(201)
    .json({ message: `Invoice ${invoiceNumber} created.`, notification })
})

//update invoice
const updateInvoice = asyncHandler(async (req, res, next) => {
  const data = {}
  const userId = req.user.id
  const { invoiceId } = req.params
  const {
    invoiceNumber,
    status,
    totalAmount,
    notes,
    currency,
    issueDate,
    dueDate,
    subTotal,
    taxRate,
    discountRate,
    title,
    paymentStatus,
    paymentMethod
  } = req.body

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId, userId: userId }
  })

  if (!invoice) return next(new ApiError('Invoice to update not found', 404))

  if (title) data.title = title
  if (invoiceNumber) data.invoiceNumber = invoiceNumber
  if (status) data.status = status
  if (totalAmount) data.totalAmount = totalAmount
  if (notes) data.notes = notes
  if (currency) data.currency = currency
  if (issueDate) data.issueDate = issueDate
  if (dueDate) data.issueDate = dueDate
  if (discountRate) data.discountRate = discountRate
  if (taxRate) data.taxRate = taxRate
  if (subTotal) data.subTotal = subTotal
  if (paymentStatus) data.paymentStatus = paymentStatus
  if (paymentMethod) data.paymentMethod = paymentMethod

  const updatedInvoice = await prisma.invoice.update({
    where: { id: invoiceId, userId: userId },
    data
  })

  if (!updatedInvoice) return next(new ApiError('Invoice not updated.,', 400))

  res.status(200).json({ message: `Invoice ${invoiceNumber} updated.` })
})

// delete invoice
const deleteInvoice = asyncHandler(async (req, res, next) => {
  const userId = req.user.id
  const { invoiceId } = req.params

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId, userId: userId }
  })

  if (!invoice) return next(new ApiError('Invoice to delete not found', 404))

  const deletedInvoice = await prisma.invoice.delete({
    where: { id: invoiceId, userId: userId }
  })

  res.status(200).json({ message: 'Invoice deleted' })
})

export { getInvoice, getInvoices, createInvoice, deleteInvoice, updateInvoice }
