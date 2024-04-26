const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({

    userName:{
        type:String,
        required:[true,'user name is required']

    },
email:{

    type: String,
    required:[true,'email is required'],
    unique: true
},
password:{
type:String,
required:[true, 'password is required']
},

address:{
    type:String

},
phone:{
    type:String,
    required:[]
},

userType:{
type:String,
required:[true,'user type is required'],
default:'client',
enum:['client','admin', 'vendor','driver']
},

profile:{
    type:String,
    default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Duser&psig=AOvVaw1IY0Ld4z76jiGZtoPlL5K4&ust=1711100537726000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCK-7GIhYUDFQAAAAAdAAAAABAE'

},

answer:{

type:String,
required:[true,'Answer is required']
}
},{timestamps:true})

module.exports=mongoose.model('User' ,userSchema)