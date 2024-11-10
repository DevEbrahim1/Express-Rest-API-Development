const mongoose=require('mongoose')
const DataScema=mongoose.Schema({
    FirstName:{type:String},
    LastName:{type:String},
    EmailAddress:{type:String},
    MOblileNumber:{type:String},
    City:{type:String},
    UserName:{type:String},
    Password:{type:String}

},{versionKey:false});
const ProfileModel=mongoose.model('Profile',DataScema);
module.exports=ProfileModel;