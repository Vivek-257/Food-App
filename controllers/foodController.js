const foodModel = require("../models/foodModel");

const createFoodController=async(req,res)=>{
try {
    
const {
  title,
  description,
  price,
  foodTags,
  category,
  code,
  isAvailable,
  resturant,
  rating,
} = req.body;    
            // {} is called destructure

         if(!title ||  !description || !price || !resturant)   
            {
                return res.status(500).send({
                    success:false,
                    message:' please provide all fields'
                })
            }
            const newFood=new foodModel({
                title,
                description,
                price,
                foodTags,
                category,
                code,
                isAvailable,
                resturant,
                rating,

            })

            await newFood.save()
            res.status(201).send({

                success:true,
                message:'new food created',
                newFood
            })

} catch (error) {
    console.log(error)
    res.status(500).send({

        success:false,
        message:'Error in create api'
    })
}

}

//get all food

const getAllFoodController=async(req,res)=>{
try {

const foods=await foodModel.find({})
if(!foods){

    return res.status(404).send({

        message:'no foods found'
    })
}
res.status(200).send({
    success:true,
    message:foods.length,
    foods

})
    
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"cannot get foods",
error
    })
}

}

const getSingleFoodController= async(req,res)=>{

try {
    const foodId=req.params.id 

    if(!foodId)
        {
            return res.status(404).send({
                message: 'please provide id'
            })
        }
    const food=await foodModel.findById(foodId)
    if(!food)
        {
            return res.status(404).send({
                success:false,
                message: 'food does not exist with this id'

            })
        }
res.status(200).send({
    success:true,
    food
})


} catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'error in get single food api',
        error 
    })
}

}


const getFoodByResturantController= async(req,res)=>{

    try {
        const resturantId=req.params.id 
    
        if(!resturantId)
            {
                return res.status(404).send({
                    message: 'please provide  resturant id'
                })
            }
        const food=await foodModel.find({resturant:resturantId})
        if(!food)
            {
                return res.status(404).send({
                    success:false,
                    message: 'food does not exist with this id'
    
                })
            }
    res.status(200).send({
        success:true,
        food
    })
    
    
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in get single food api',
            error 
        })
    }
    
    }

module.exports={createFoodController,getAllFoodController,getSingleFoodController,getFoodByResturantController}