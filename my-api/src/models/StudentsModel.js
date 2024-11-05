//Mongoose Create a Model

const mongoose= require('mongoose')

const DataSchema= mongoose.Schema({
    Name:{type:String},
    Roll:{type:Number},
    Class:{type:String},
    Remarks:{type:String,default:"No Remarks"}
},{versionKey:false})

const StudentsModel=mongoose.model('students',DataSchema);
module.exports=StudentsModel;