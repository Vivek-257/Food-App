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
module.exports={createCatController,getAllCatController}