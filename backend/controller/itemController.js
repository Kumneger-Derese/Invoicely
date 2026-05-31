import { asyncHandler } from "../middleware/asyncHandler.js";
import { prisma } from "../config/prisma.js";
import { ApiError } from "../utils/apiError.js";
import { calculateInvoice } from "../utils/calculateInvoice.js";

// get one specific invoice item
const getItem = asyncHandler(async (req, res, next) => {
    const { invoiceId, itemId } = req.params;
    const item = await prisma.invoiceItem.findUnique({
        where: { id: itemId, invoiceId },
    });

    if (!item) return next(new ApiError("Item not found", 404));

    res.status(200).json(item);
});

// get all invoice item
const getItems = asyncHandler(async (req, res, next) => {
    const { invoiceId } = req.params;

    const items = await prisma.invoiceItem.findMany({
        where: { invoiceId },
    });

    res.status(200).json(items);
});

// create invoice item
const createItem = asyncHandler(async (req, res, next) => {
    let item;
    const { invoiceId } = req.params;
    const { title, description, price, quantity, productId } = req.body;

    const invoice = await prisma.invoice.findUnique({
        where: { id: invoiceId },
    });

    if (!invoice)
        return next(new ApiError("Invoice to create item on to not found", 404));

    if (productId) {
        // if productId is provided
        const product = await prisma.product.findUnique({
            where: { id: productId },
        });

        item = await prisma.invoiceItem.create({
            data: {
                invoiceId,
                productId,
                title: product.title,
                description: product.description,
                price: product.price,
                quantity,
            },
        });

    } else {
        // if productId is not provided
        item = await prisma.invoiceItem.create({
            data: {
                invoiceId,
                productId: null,
                title,
                description,
                price,
                quantity,
            },
        });

    }

    if (!item)
        return next(new ApiError("Item not created.", 400));

    await calculateInvoice(invoiceId)

    res.status(201).json({
        message: "Item created",
        item,
    });
});

// update invoice item
const updateItem = asyncHandler(async (req, res, next) => {
    const data = {};
    const { invoiceId, itemId } = req.params;
    const { title, description, price, quantity } = req.body;

    const item = await prisma.invoiceItem.findUnique({
        where: { id: itemId, invoiceId },
    });

    if (!item) return next(new ApiError("Item to update not found", 404));

    if (title) data.title = title;
    if (description) data.description = description;
    if (price) data.price = price;
    if (quantity) data.quantity = parseInt(quantity);

    const updatedItem = await prisma.invoiceItem.update({
        where: { id: itemId, invoiceId },
        data,
    });

    await calculateInvoice(invoiceId)

    res.status(200).json({
        message: "Item updated",
        item: updatedItem,
    });
});

// delete invoice item
const deleteItem = asyncHandler(async (req, res, next) => {
    const { invoiceId, itemId } = req.params;

    const item = await prisma.invoiceItem.findUnique({
        where: { id: itemId, invoiceId },
    });

    if (!item) return next(new ApiError("Item to delete not found", 404));

    await prisma.invoiceItem.delete({
        where: { id: itemId, invoiceId },
    });

    await calculateInvoice(invoiceId)

    res.status(200).json({ message: "Item Deleted", });
});

export { getItem, getItems, createItem, updateItem, deleteItem };
