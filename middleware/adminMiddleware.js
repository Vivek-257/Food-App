

const userModel=require('../models/userModel')
module.exports=async(req,res,next)=>{

    try {
     
const user=await userModel.findById(req.body.id)
if(user.userType!=='admin')
   { return res.status(401).send({

success:false,
message:'only Admin access'    })}
else {
    next();
}

    } catch (error) {
        console.log(error)
        res.status(500).send({

            success:false
,
message:'unauthorised access',
error
        })
    }
}