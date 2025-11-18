import { Router } from 'express'
import { protect } from '../middleware/protect.js'
import {
  createInvoiceItem,
  deleteInvoiceItem,
  getInvoiceItem,
  getInvoiceItems,
  updateInvoiceItem
} from '../controller/invoiceItemController.js'
import { validateRequest } from '../middleware/validateRequest.js'
import {
  createInvoiceItemSchema,
  updateInvoiceItemSchema
} from '../validation/invoiveItemValidation.js'

const invoiceItemRouter = Router()

invoiceItemRouter.use(protect)

invoiceItemRouter.get('/item/:invoiceItemId', getInvoiceItem)
invoiceItemRouter.get('/:invoiceId', getInvoiceItems)
invoiceItemRouter.post(
  '/create/:invoiceId',
  validateRequest(createInvoiceItemSchema),
  createInvoiceItem
)
invoiceItemRouter.put(
  '/update/:invoiceItemId',
  validateRequest(updateInvoiceItemSchema),
  updateInvoiceItem
)
invoiceItemRouter.delete('/delete/:invoiceItemId', deleteInvoiceItem)

export { invoiceItemRouter }
