import { Router } from "express";
import {
  createInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  updateInvoice,
} from "../controller/invoiceController.js";
import { protect } from "../middleware/protect.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  createInvoiceSchema,
  updateInvoiceSchema,
} from "../validation/invoiceValidation.js";

const invoiceRouter = Router();

invoiceRouter.use(protect);

invoiceRouter.get("/", getInvoices);
invoiceRouter.get("/invoice/:invoiceId", getInvoice);
invoiceRouter.post(
  "/create/:clientId",
  validateRequest(createInvoiceSchema),
  createInvoice
);
invoiceRouter.put(
  "/update/:invoiceId",
  validateRequest(updateInvoiceSchema),
  updateInvoice
);
invoiceRouter.delete("/delete/:invoiceId", deleteInvoice);

export { invoiceRouter };
