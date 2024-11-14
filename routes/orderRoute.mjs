import { Router } from 'express';
import orderController from '../controllers/orderController.mjs';
const router = Router();

router.get('/' , orderController.getAllOrders)
router.get('/:id' , orderController.getOrderById)
router.patch('/update/:id' , orderController.updateOrderStatus)
router.delete('/delete/:id' , orderController.deleteOrder)
router.post('/registerTour' , orderController.registerTour)
router.get('/detailbyuser/:userId' , orderController.getOrderByIdUser)
router.delete('/cancel/:id' , orderController.cancleOrderById)


export default router