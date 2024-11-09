const express = require('express');
const helloController = require("../controllers/helloController");
const StudentsController = require("../controllers/StudentsController");
const TokenissueController = require("../controllers/TokenissueController");
const JWTPractice = require('../controllers/JWTPractice');
const TokenVerifyMiddleware = require('../middleware/TokenVerifyMiddleware');




const router= express.Router();


//this is my first get routing 
router.get("/hello-get",helloController.HelloGet)
//this is my first post routing 
router.post("/hello-post",helloController.HelloPost)


//mogoose Apply JWS Auth
router.get("/TokenIssue",TokenissueController.TokenIssue)
router.post("/InsertStudents",TokenVerifyMiddleware,StudentsController.InsertStudents)
router.get("/ReadStudents",TokenVerifyMiddleware,StudentsController.ReadStudents)
router.put("/UpdateStudents/:id",TokenVerifyMiddleware,StudentsController.UpdateStudents)
router.get("/DeleteStudents/:id",TokenVerifyMiddleware,StudentsController.DeleteStudents)


//Practice Create JWT Token Encode code
router.get("/CreateToken",JWTPractice.CreateToken)
//Decode JWT Token Decode code
router.get("/DecodeToken",JWTPractice.DecodeToken)

module.exports=router;