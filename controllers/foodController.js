const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

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

    const updateFoodController=async(req,res)=>{

        try {
            const foodId=req.params.id
            if(!foodId)
                {
                    return res.status(404).send({
                        success:false,
                        message: 'nofood id was found'
                    })
                }
                const food=await foodModel.findById(foodId)
                if(!food)
                    {
                        return res.status(404).send({
                            success:false,
                            message: 'no food was found'
                        })
                    }

                    const { title,
                        description,
                        price,
                        foodTags,
                        category,
                        code,
                        isAvailable,
                        resturant,
                        rating}=req.body

                        const updatedFood=await foodModel.findByIdAndUpdate(foodId, { title,
                            description,
                            price,
                            foodTags,
                            category,
                            code,
                            isAvailable,
                            resturant,
                            rating,}, {new:true})
                            return res.status(200).send({
                                success: true,
                                message: 'Food item updated successfully',
                                data: updatedFood
                            });

        } catch (error) {
            console.log(error)
            res.status(500).send({

                success:false,
                message: 'error in update food api ',
                error
            })
        }
    }

    //delete food api

    const deleteFoodController=async(req,res)=>{
try {
    const foodId=req.params.id
    if(!foodId){
return res.status(404).send({
    message:'provide food id'

})
    } const food=await foodModel.findById(foodId)
    if(!food)
        {
return res.status(404).send({
    success:'false',
    message:'no food found with this id'
})
        }

        await foodModel.findByIdAndDelete(foodId)
        res.status(200).send({
            message:'food deleted succssfully'
        })

} catch (error) {
    console.log(error);
    res.status(500).send({
        message:'error in API'
    })
}
    }
//place order

const placeOrderController= async(req,res)=>{


    try {
        const {cart,payment}=req.body
        if(!cart || !payment)
            {
return res.status(404).send({
    message:'cart or payment is not present'
})

            }
        let total=0

        cart.map((i)=>{
            total+=i.price
        })

        const newOrder=new orderModel({
            foods:cart,
            payment:total,
            buyer: req.body.id
        });

        await newOrder.save();

        res.status(201).send({
            success:true,
            message: 'order placed successfully',
            newOrder
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in place order API',
            error
        })
    }
}
//change order status

const orderStatusControler= async(req,res)=>{
try {
    const orderId=req.params.id
    const {status}=req.body
    const order=await orderModel.findByIdAndUpdate(orderId, {status}, {new:true})
    console.log("trying to print only id",order.id)
    console.log("here i want underscore id",order._id);
    res.status(200).send({
        success:true,
        message:"order status updated"
    })

} catch (error) {
    console.log(error);
}

}

module.exports={createFoodController,getAllFoodController,getSingleFoodController,getFoodByResturantController,updateFoodController,deleteFoodController,placeOrderController,orderStatusControler}