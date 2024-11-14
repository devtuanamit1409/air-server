import { Router } from "express";
import tourController from "../controllers/tourController.mjs";
const router = Router()

router.get('/' , tourController.getAllTour)
router.post('/add' ,tourController.createTour)
router.get('/categoryId/:categoryId' , tourController.getTourbyIdCategory)
router.get('/detail/:tourId' , tourController.getOneTour)
router.patch('/update/:tourId' , tourController.updateTour)
router.delete('/delete/:tourId' , tourController.deleteTour)
router.patch('/addguide/:tourId' , tourController.addIdGuide)
router.get('/guideId/:idguide' , tourController.getTourbyIdguide)
router.patch('/updatestatus/:tourId' , tourController.updateTourStatus)

export default router