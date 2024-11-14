import invoiceController from "../controllers/InvoiceController.mjs";
import { Router } from "express";
const router = Router()

router.get('/' , invoiceController.getAll)
router.post('/post' , invoiceController.createInvoice)

export default router
