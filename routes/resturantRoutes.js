const express=require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {createResturantController, getAllResturantController} = require('../controllers/resturantController');

const router=express.Router();



//create resturant
router.post('/create',authMiddleware,createResturantController)

router.get('/getAll',getAllResturantController)
module.exports=router