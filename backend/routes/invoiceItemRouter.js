import {Router} from 'express'
import {protect} from "../middleware/protect.js";
import {
    createInvoiceItem,
    deleteInvoiceItem,
    getInvoiceItem,
    getInvoiceItems,
    updateInvoiceItem
} from "../controller/invoiceItemController.js";

const invoiceItemRouter = Router()

invoiceItemRouter.use(protect)

invoiceItemRouter.get('/item/:invoiceItemId', getInvoiceItem)
invoiceItemRouter.get('/:invoiceId', getInvoiceItems)
invoiceItemRouter.post('/create/:invoiceId', createInvoiceItem)
invoiceItemRouter.put('/update/:invoiceItemId', updateInvoiceItem)
invoiceItemRouter.delete('/delete/:invoiceItemId', deleteInvoiceItem)

export {invoiceItemRouter}