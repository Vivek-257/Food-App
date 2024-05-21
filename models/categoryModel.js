const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
title:{

    type:String,
    required:[true,'category title is required']
}


},{timestamps:true})

module.exports=mongoose.model('Category' ,categorySchema)