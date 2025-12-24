import {asyncHandler} from "../middleware/asyncHandler.js";
import {prisma} from "../config/prisma.js";
import {ApiError} from "../utils/apiError.js";


// get invoice product
const getProduct = asyncHandler(async (req, res, next) => {
    const {productId} = req.params;

    const product = await prisma.product.findUnique({
        where: {id: productId},
        omit: {createdAt: true, updatedAt: true},
    })

    if (!product) return next(new ApiError('Product not found.', 404))

    res.status(200).json(product)
})

// get all invoicesItem
const getProducts = asyncHandler(async (req, res, next) => {
    const products = await prisma.product.findMany({
        omit: {createdAt: true, updatedAt: true}
    })

    if (!products) return []

    res.status(200).json(products)
})

// create invoice product
const createProduct = asyncHandler(async (req, res, next) => {
    const {title, description, price} = req.body

    const product = await prisma.product.create({
        data: {title, description, price},
    })

    if (!product) return next(new ApiError('Product not created.', 404))

    res.status(201).send({
        message: 'Product created.',
        product
    })
})

// update invoice product
const updateProduct = asyncHandler(async (req, res, next) => {
    const data = {}
    const {productId} = req.params;
    const {title, description, price} = req.body


    const product = await prisma.product.findUnique({
        where: {id: productId},
    })

    if (!product) return next(new ApiError('Product to update is not found.', 404))

    if (title) data.title = title
    if (description) data.description = description
    if (price) data.price = price

    await prisma.product.update({
        where: {id: productId},
        data
    })

    res.status(200).json({message: 'Product updated.', product})
})

// delete invoice product
const deleteProduct = asyncHandler(async (req, res, next) => {
    const {productId} = req.params;

    const product = await prisma.product.findUnique({
        where: {id: productId},
    })

    if (!product) return next(new ApiError('Product to delete is not found.', 404))

    await prisma.product.delete({where: {id: productId}})

    res.status(200).json({message: 'Product deleted.',})
})


export {getProduct, getProducts, createProduct, updateProduct, deleteProduct}