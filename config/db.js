const mongoose=require('mongoose')
const colors=require('colors')

const connectDb=async()=>{
try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: 'food-app' });
    console.log("connected to database")
} catch (error) {
    console.log("db error", error)
}

}
module.exports=connectDb;


