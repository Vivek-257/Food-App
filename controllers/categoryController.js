//create cat

const categoryModel = require("../models/categoryModel")

const createCatController=async(req,res)=>{
try {
    const {title}=req.body
    //validation

    if(!title)
        {

            return res.status.send({

                success:false,
                message:'please provide category title'
            })
        }

const newCategory=new categoryModel({title})
await newCategory.save()
res.status(201).send({

    success:true,
    mesage:'category has been created'
})


} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'error in create category api',
        error
    })
}

}
const getAllCatController=async(req,res)=>{

try {
    const categories=await categoryModel.find({})

    if(!categories)
        {
res.status(404).send({

    message:'no categories found'
})

        }
        res.status(200).send({
            success:true,
            totalCat:categories.length,
            categories
        })


} catch (error) {
   console.log(error) 
   return res.status(500).send({

    success:false,
    message:'error in get all category API'
   })
}

}
//update cat
const updateCatController=async(req,res)=>{

    const {id}=req.params
    const {title}=req.body
    try {
          const updatedCategory=await categoryModel.findByIdAndUpdate(id,{title},{new:true})
           if(!updatedCategory){

            return res.status(404).send({
                message:'no category by tht id found '
            })
           }

           res.status(200).send({

            success:true,
            message:'category updated successfully'
           })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
success:false,
message:'error in update cat api',
error

        })
    }

}

const deleteCatController=async(req,res)=>{
    const {id}=req.params
try {

const idToDelete=await categoryModel.findById(id);
if(!idToDelete)
    {
return res.status(404).send({
    success:false,
    message:'cannot find id'
})

    }
    await categoryModel.findByIdAndDelete(id)
    res.status(200).send({
        message:'id deleted successfully'
    })
    
} catch (error) {
    console.log(error)
    req.res(500).status({
success:false,
message:'error in deletion',
error

    })
}

}
module.exports={createCatController,getAllCatController,updateCatController,deleteCatController}