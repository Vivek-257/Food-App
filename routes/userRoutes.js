const express=require('express');
const getUserController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router=express.Router();

//get user

router.get('/getUser',authMiddleware, getUserController)

module.exports=router