import { Router } from "express";
import pointEndController from "../controllers/pointEndController.mjs";

const router = Router()

router.post('/add' , pointEndController.addPointEnd)
router.get('/' , pointEndController.getAllPointend)
router.delete('/delete/:id' , pointEndController.deletePointend)

export default router