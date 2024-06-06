const express=require('express')
const authMiddleware = require('../middleware/authMiddleware');
const { createFoodController, getAllFoodController,getSingleFoodController, getFoodByResturantController } = require('../controllers/foodController');


//router object
const router=express.Router()

router.post("/create",authMiddleware,createFoodController)
router.get("/getAll", getAllFoodController)
router.get("/get/:id", getSingleFoodController)

//get food by resturant
router.get("/getByResturant/:id", getFoodByResturantController)

module.exports=router