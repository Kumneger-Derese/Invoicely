import express from 'express'
import {protect} from '../middleware/protect.js'
import {
    createProduct,
    deleteProduct,
    getProduct,
    getProducts,
    updateProduct
} from '../controller/productController.js'
import {validateRequest} from '../middleware/validateRequest.js'
import { createProductSchema,updateProductSchema} from '../validation/productValidation.js'

const productRouter = express.Router()

productRouter.use(protect)

productRouter.get('/', getProducts)
productRouter.get('/:productId', getProduct)
productRouter.post('/create', validateRequest(createProductSchema), createProduct)
productRouter.put('/update/:productId', validateRequest(updateProductSchema), updateProduct)
productRouter.delete('/delete/:productId', deleteProduct)

export {productRouter}
