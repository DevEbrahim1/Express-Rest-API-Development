const express = require('express');
const helloController = require("../controllers/helloController");
const router= express.Router();


//this is my first get routing 
router.get("/hello-get",helloController.Hello)

//this is my first post routing 
router.post("/hello-post",helloController.Hello)

module.exports=router;