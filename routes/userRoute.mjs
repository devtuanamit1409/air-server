import userController from "../controllers/userController.mjs";

import { Router } from "express";

const router = Router();

router.get('/' , userController.getAllusers)
router.get('/:id' , userController.getOneuser)

router.delete('/delete/:id',  userController.deleteUser)

router.patch('/update/:id' ,  userController.updateUser)


export default router
