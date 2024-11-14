import { Router } from "express";
import pointStartController from "../controllers/pointstartController.mjs";

const router = Router()

router.post('/add' , pointStartController.addPointStart)
router.get('/' , pointStartController.getAllPointstart)
router.delete('/delete/:id' , pointStartController.deletePointstart)

export default router