const express=require('express')
const authMiddleware = require('../middleware/authMiddleware');
const { createFoodController, getAllFoodController,getSingleFoodController, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusControler } = require('../controllers/foodController');
const adminMiddleware = require('../middleware/adminMiddleware');


//router object
const router=express.Router()

router.post("/create",authMiddleware,createFoodController)
router.get("/getAll", getAllFoodController)
router.get("/get/:id", getSingleFoodController)

//get food by resturant
router.get("/getByResturant/:id", getFoodByResturantController)

//update food item

router.put("/update/:id" ,authMiddleware, updateFoodController)

router.delete("/delete/:id" ,authMiddleware,deleteFoodController )


router.post('/placeorder',authMiddleware, placeOrderController)


//order status

router.post('/orderStatus/:id' ,authMiddleware, adminMiddleware, orderStatusControler)

module.exports=router