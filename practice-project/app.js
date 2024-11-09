//Basic Liberally Import
const express=require('express');
const router =require('./src/routes/api');
const app = new express();
const bodyParser=require('body-parser');

//Security Middleware Liberally Import
const rateLimit =require('express-rate-limit');
const helmet =require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const hpp=require('hpp');
const cors =require('cors');

//Database Liberally Import
const mongoose=require('mongoose');


//Security Middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())

//Body Parser Implement
app.use(bodyParser.json());

//Request Rate Limit
const Limiter =rateLimit({WindowMs:15*60*1000,max:3000})
app.use(Limiter)

//Mongo Db Batabase Connection
let URI="mongodb://127.0.0.1:27017/Todo";
let OPTION={user:'',pass:''}
// Async function ব্যবহার করে সংযোগ স্থাপন
async function connectDB() {
    try {
        await mongoose.connect(URI, OPTION);
        console.log("Connection Success");
    } catch (error) {
        console.log("Connection Error:", error);
    }
}

connectDB();

//Routing Implement
app.use("/api/v1",router)

//Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"Fail",date:"Not Found"})
})

module.exports=app;