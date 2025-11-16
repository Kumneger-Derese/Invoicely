import {asyncHandler} from "../middleware/asyncHandler.js";
import {prisma} from "../config/prisma.js";
import {ApiError} from "../utils/apiError.js";


// get invoice item
const getInvoiceItem = asyncHandler(async (req, res, next) => {
    const {invoiceItemId} = req.params;

    const invoiceItem = await prisma.invoiceItem.findUnique({
        where: {id: invoiceItemId},
        omit: {createdAt: true, updatedAt: true},
    })

    if (!invoiceItem) return next(new ApiError('Invoice item not found.', 404))

    res.status(200).json(invoiceItem)
})

// get all invoicesItem
const getInvoiceItems = asyncHandler(async (req, res, next) => {
    const userId = req.user.id
    const {invoiceId} = req.params;

    const invoice = await prisma.invoice.findUnique({
        where: {id: invoiceId, userId: userId},
    })

    if (!invoice) return next(new ApiError('Invoice not found.', 404))

    const invoiceItems = await prisma.invoiceItem.findMany({
        where: {invoiceId},
        omit: {createdAt: true, updatedAt: true}
    })

    if (!invoiceItems) return []

    res.status(200).json(invoiceItems)
})

// create invoice item
const createInvoiceItem = asyncHandler(async (req, res, next) => {
    const userId = req.user.id
    const {invoiceId} = req.params
    const {title, description, quantity, price} = req.body
    const total = quantity * price

    const invoice = await prisma.invoice.findUnique({
        where: {id: invoiceId, userId: userId},
    })

    if (!invoice) return next(new ApiError('Invoice to create item for is not found.', 404))

    const invoiceItem = await prisma.invoiceItem.create({
        data: {title, description, quantity, price, total, invoiceId},
    })

    if (!invoiceItem) return next(new ApiError('Invoice item not created.', 404))

    res.status(201).send({
        message: 'Invoice item created.',
        invoiceItem
    })
})

// update invoice item
const updateInvoiceItem = asyncHandler(async (req, res, next) => {
    const data = {}
    const {invoiceItemId} = req.params;
    const {title, description, quantity, price} = req.body


    const invoiceItem = await prisma.invoiceItem.findUnique({
        where: {id: invoiceItemId},
    })

    if (!invoiceItem) return next(new ApiError('Invoice item to update is not found.', 404))

    if (title) data.title = title
    if (description) data.description = description
    if (quantity) data.quantity = quantity
    if (price) data.price = price
    if (price && quantity) {
        data.total = quantity * price
    }

    await prisma.invoiceItem.update({
        where: {id: invoiceItemId},
        data
    })

    res.status(200).json({message: 'Invoice item updated.'})
})

// delete invoice item
const deleteInvoiceItem = asyncHandler(async (req, res, next) => {
    const {invoiceItemId} = req.params;

    const invoiceItem = await prisma.invoiceItem.findUnique({
        where: {id: invoiceItemId},
    })

    if (!invoiceItem) return next(new ApiError('Invoice item to delete is not found.', 404))

    await prisma.invoiceItem.delete({where: {id: invoiceItemId}})

    res.status(200).json({message: 'Invoice item deleted.',})
})


export {getInvoiceItems, createInvoiceItem, updateInvoiceItem, deleteInvoiceItem, getInvoiceItem}