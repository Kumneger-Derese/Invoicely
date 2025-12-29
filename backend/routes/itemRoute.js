import express from 'express'
import {protect} from "../middleware/protect.js";
import {createItem, deleteItem, getItem, getItems, updateItem} from "../controller/itemController.js";

const itemsRouter = express.Router()

itemsRouter.use(protect)

itemsRouter.get('/:invoiceId', getItems)
itemsRouter.get('/:invoiceId/:itemId', getItem)
itemsRouter.post('/create/:invoiceId', createItem)
itemsRouter.put('/update/:invoiceId/:itemId', updateItem)
itemsRouter.delete('/delete/:invoiceId/:itemId', deleteItem)

export {itemsRouter}