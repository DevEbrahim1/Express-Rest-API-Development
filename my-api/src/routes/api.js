const express=require('express');
const helloController=require("/controllers/helloController");
const router= express.Router();


//this is my first get routing 
router.get("/hello-get",helloController.hello)
router.post("/hello-post",helloController.hello)

module.exports=router;