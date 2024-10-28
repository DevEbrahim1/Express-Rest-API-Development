const express = require('express');
const helloController = require("../controllers/helloController");
const StudentsController = require("../controllers/StudentsController");



const router= express.Router();


//this is my first get routing 
router.get("/hello-get",helloController.HelloGet)

//this is my first post routing 
router.post("/hello-post",helloController.HelloPost)


//mogoose
router.post("/InsertStudents",StudentsController.InsertStudents)



module.exports=router;