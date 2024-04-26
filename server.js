const express=require('express')
const colors=require('colors')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const connectDb = require('./config/db')
const app=express()

dotenv.config(); //specify path inside config() if .env is in some folder but here it in in root so no need
//db connection
connectDb();


//middleware ke liye app.use ka istemal krna pdta hai
app.use(cors());
app.use(express.json()) //to access data in json format
app.use(morgan('dev'))
app.use((req, res, next) => {
    console.log('Requested URL:', req.url);
    console.log("request method", req.method)
    next();
  });
app.use('/api/v1/test',require("./routes/testRoute") ) //api/v1/test is common for all routes
app.use('/api/v1/auth',require("./routes/authRoutes") ) //api/v1/test is common for all auth routes like login and register
app.use('/api/v1/user',require("./routes/userRoutes") )
app.use('/api/v1/resturant', require("./routes/resturantRoutes"))

app.get('/',(req,res)=>{
return res.status(200).send("<h1>welcome to food server</h1>")

})

const PORT=process.env.PORT;

app.listen(PORT,()=>{

    console.log("Node Server is running".bgRed.yellow)
})