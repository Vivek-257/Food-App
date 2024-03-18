const express=require('express')
const app=express()
app.get('/',(req,res)=>{
return res.status(200).send("<h1>welcome to food server</h1>")

})

const PORT=8000;

app.listen(PORT,()=>{

    console.log("server is running")
})