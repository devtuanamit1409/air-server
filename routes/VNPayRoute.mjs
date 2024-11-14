import { createOrder  } from "../controllers/VNPay.mjs";

import { Router } from "express";

const router = Router();

router.post('/' , createOrder)

export default router