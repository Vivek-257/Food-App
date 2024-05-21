//create resturant

const resturantModel = require("../models/resturantModel")


const createResturantController=async(req,res)=>{

try {
    const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords}=req.body
    if(!title || !coords ){

return res.status(500).send({

  success:false,
  message:"please provide title and address"
})
    }

    const isExisting=await resturantModel.findOne({title})
    if(isExisting)
    {
      return res.status(500).send({
        success:true,
        message:"hotel already exists"
      })
    }
    const newResturant=new resturantModel({title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords

    })

    await newResturant.save()

    res.status(201).send({

      success:true,
message:"new restaurrant created successfully",
    })

} catch (error) {
  console.log(error)
  res.status(500).send({

    success:false,
    message:"error in create restaurant api",
    error
  })  
}
}
//get all resturants

const getAllResturantController=async(req,res)=>{

try {
  
const resturant=await resturantModel.find({})

if(!resturant){

  return res.status(404).send({

    success:false,
    message:"no resturant found"
  })
}
const numberOfResturants=resturant.length;
res.status(200).send({
  success:true,
  message:`${numberOfResturants} restaurant(s) found.`,
  resturant
})
} catch (error) {
  console.log(error)
  res.status(500).send({

    success:false,
    message:'Error in Get all resturant API',error
  })
}
}

const getResturantByIdController=async(req,res)=>{

try {

  const resturantId=req.params.id
  if(!resturantId)
  {
    return res.status.send(404).send({

      success:false,
      message:'please provie resturant id'
    })
  }
  const resturant=await resturantModel.findById(resturantId)
  if(!resturant)
  {

    return res.status(404).send({
      success:false,
      message:'no resturant found',
    })
  }

  res.status(200).send({
    success:true,
    resturant
  })
  
} catch (error) {
  console.log(error)
  res.status(500).send({

    success:false,
    message:'Error in get resturant by id',
    error
  })
}
}

const deleteResturanController=async(req,res)=>{


  try {
    
    const resturantId=req.params.id
    const resturant =await resturantModel.findById(resturantId)

    console.log("id found----->",resturant)
 
    if(!resturant)
      {
         return res.status(404).send({

          success:false,
          message:'no resturant found'
         })

      }
      await resturantModel.findByIdAndDelete(resturantId)
      return res.status(200).send({

        success:true,
        message:'resturant deleted successfully'
      })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:"error in deleting",
      error
    })
  }
}
module.exports={createResturantController,getAllResturantController,getResturantByIdController,deleteResturanController}




//await ka result bhi valiable me store hota hai 