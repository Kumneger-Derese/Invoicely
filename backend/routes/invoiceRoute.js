import {Router} from 'express'
import {createInvoice, deleteInvoice, getInvoice, getInvoices, updateInvoice} from "../controller/invoiceController.js";
import {protect} from "../middleware/protect.js";

const invoiceRouter = Router()

invoiceRouter.use(protect)

invoiceRouter.get('/:clientId', getInvoices)
invoiceRouter.get('/invoice/:invoiceId', getInvoice)
invoiceRouter.post('/create/:clientId', createInvoice)
invoiceRouter.put('/update/:invoiceId', updateInvoice)
invoiceRouter.delete('/delete/:invoiceId', deleteInvoice)

export {invoiceRouter}