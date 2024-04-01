const testUserController=(req,res)=>{
try{
res.status(200).send({

  success:true,
  message:"test user data api"  
})
//console.log(req.url)
}catch(error){
    console.log("error in test api")

}

}

module.exports={testUserController}