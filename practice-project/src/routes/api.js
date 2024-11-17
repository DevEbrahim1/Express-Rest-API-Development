const express=require('express');
const ProfileController=require('../controllers/ProfileController')
const ToDoListController=require('../controllers/ToDoListController')
const AuthVerifyMiddleware=require('../middleware/AuthVerifyMiddleware')
const router=express.Router();

//Create Profile Router
router.post('/CreateProfile',ProfileController.CreateProfile);
router.post('/UserLogin',ProfileController.UserLogin);
router.get('/SelectProfile',AuthVerifyMiddleware,ProfileController.SelectProfile);
router.post('/UpdateProfile',AuthVerifyMiddleware,ProfileController.UpdateProfile);

//Create Todo Router 
router.post('/CreateToDo',AuthVerifyMiddleware,ToDoListController.CreateToDo);
router.get('/SelectToDo',AuthVerifyMiddleware,ToDoListController.SelectToDo);
router.post('/UpdateToDo',AuthVerifyMiddleware,ToDoListController.UpdateToDo);
module.exports=router;