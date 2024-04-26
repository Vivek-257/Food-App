// get user info

//const authMiddleware = require("../middleware/authMiddleware");
const userModel = require("../models/userModel");
const bcrypt=require('bcryptjs')
const getUserController=async(req,res)=>{
   // res.status(200).send('User Data')

   try {

    const user=await userModel.findById({_id:req.body.id})
    console.log("user", user)
    //validation
    if(!user){

        return res.status(404).send({
            success:false,
            message:'user not found'
        })
    }

    res.status(200).send({
        success:true,
        message:"user found",
        user
    })
    
   } catch (error) {
    console.log(error)
    res.status(500).send({
        message:"error in getuser api"
    })
   }
   

}
const updateUserController= async(req,res)=>{

try {
    //find user
    const user=await userModel.findById({_id:req.body.id})
    if(!user)
    {
        return res.status(404).send({
            success:false,
            message:'user not found'
        })  
    }
    const {userName,address,phone}=req.body
    if(userName)
        user.userName=userName
    if(address)
    user.address=address
     if(phone)
     user.phone=phone

     await user.save()
     res.status(200).send({

        success:true,
        message:"user updated successfully"
     })


} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in update user API',
        error
    })
}
}

//password update

const updatePasswordController=async(req,res)=>{
try {
    const user=await userModel.findById({_id:req.body.id})
    //validation
    if(!user)
    {
        res.status(404).send({
            success:false,
            message:"user not found"
        })
    }

    //get data from user
    const {oldPassword,newPassword}=req.body
    if(!oldPassword || !newPassword){
        res.status(500).send({
            success:false,
            message:"please provide both new and old password"
        })
    }
    const isMatch=await bcrypt.compare(oldPassword,user.password)
    if(!isMatch)
    {
       return res.status(500).send({

        success:false,
        message:"invalid old password"
       }) 
    }
    var salt=bcrypt.genSaltSync(10);
    const hashedPassword=await bcrypt.hash(newPassword,salt)
    user.password=hashedPassword
    await user.save()
    res.status(200).send({
        success:true,
        message:"password updated",
        
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
success:false,
message:"error in password update api",
error

    })
}
}

const resetPasswordController=async(req,res)=>{

try {
    const {email,newPassword,answer}=req.body
    if(!email || !newPassword || !answer)
    {
        return res.status(500).send({
success:false,
message:"please provide all fields"

        })
    }
    const user=await userModel.findOne({email,answer})
    if(!user)
    {
        res.status(404).send({
            success:false,
            message:"user not found or invalid answer"
        })
    }

    //hashing

    var salt=bcrypt.genSaltSync(10);
    const hashedPassword=await bcrypt.hash(newPassword,salt);
user.password=hashedPassword
await user.save()
res.status(200).send({
success:true,
message:"password reset successful,"

})

} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'error in password reset api',
        error
    })
}

} 

const deleteProfileController= async(req,res)=>{
try {
    await userModel.findByIdAndDelete(req.params.id)
    return res.status(200).send({
        success:true,
        message:"your account has been deleted"

    })
} catch (error) {
    console.log(error)
    res.status(500).send({

        success:false,
        message:"Error in delete profile api",
        error
    })
}

}
module.exports={getUserController, updateUserController,updatePasswordController,resetPasswordController,deleteProfileController}