const express=require('express');
const ProfileController=require('../controllers/ProfileController')
const router=express.Router();


router.post('/CreateProfile',ProfileController.CreateProfile);



module.exports=router;