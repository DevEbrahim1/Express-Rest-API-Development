const express= require('express');
const router = require("./src/routes/api");
const app=new express();

//Security Middleware Import
 const rateLimit= require('express-rate-limit')
 const helmet=require('helmet')
 const mongoSanitize= require('express-mongo-sanitize')
const xss= require('xss-clean')
const hpp = require('hpp')
const cors= require('cors')
const mongoose= require('mongoose');

//Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

//Requiest rate limited
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,// 15 minutes
    max: 100 // limit each Ip to 100
});
app.use(limiter)

//MongoDB Database Connection
let URI = "mongodb://127.0.0.1:27017/CraftShop";
let OPTION = { user: '', pass: '' };

mongoose.connect(URI, OPTION)
    .then(() => {
        console.log("Connection Success");
    })
    .catch((error) => {
        console.log("Connection Failed:", error);
    });



//Router
app.use("/api/v1",router);


//Undefined  Route
app.use('*',(req,res)=>{
    res.status(404).json({status:"Fail",data:"Not Found"})
})
module.exports=app;