const express=require('express');
const {getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router=express.Router();

//get user

router.get('/getUser',authMiddleware, getUserController)


router.put('/updateUser', authMiddleware,updateUserController)

router.post('/updatePassword' , authMiddleware, updatePasswordController)

router.post('/resetPassword' , authMiddleware, resetPasswordController)

router.delete('/deleteUser/:id', authMiddleware,deleteProfileController)



module.exports=router