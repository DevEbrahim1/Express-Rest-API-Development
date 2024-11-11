const mongoose=require('mongoose')
const DataScema=mongoose.Schema({
    FirstName:{type:String},
    LastName:{type:String},
    EmailAddress:{type:String},
    MoblileNumber:{type:String},
    City:{type:String},
    UserName:{type:String,unique:true},
    Password:{type:String}

},{versionKey:false});
const ProfileModel=mongoose.model('Profile',DataScema);
module.exports=ProfileModel;