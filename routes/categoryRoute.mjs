import categoryController from "../controllers/categoryController.mjs";
import { Router } from "express";

const router = Router()

router.get('/' , categoryController.getAllCategories)
router.post('/add' , categoryController.createCategory)
router.get('/:id' , categoryController.getCategoryById)
router.delete('/delete/:id' , categoryController.deleteCategory)
router.patch('/update/:id' , categoryController.updateCategory)

export default router