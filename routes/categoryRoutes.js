const express=require('express')
const authMiddleware = require('../middleware/authMiddleware');
const { createCatController, getAllCatController } = require('../controllers/categoryController');


//router object
const router=express.Router()

router.post('/create',authMiddleware, createCatController)
router.get('/getAll',getAllCatController)

module.exports=router