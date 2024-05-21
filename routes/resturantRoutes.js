const express=require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {createResturantController, getAllResturantController, getResturantByIdController, deleteResturanController} = require('../controllers/resturantController');

const router=express.Router();



//create resturant
router.post('/create',authMiddleware,createResturantController)
//get all restaurent
router.get('/getAll',getAllResturantController)

//get restaurent by id
router.get('/get/:id',getResturantByIdController)

router.delete('/delete/:id',authMiddleware,deleteResturanController)
module.exports=router