const express=require("express");
const auth=require('../middleware/auth');
const router=express.Router();
const {Signup,Signin,Getusers}=require("../controller/userController");
router.post('/',Signup);
router.post('/Signin',Signin);
router.post('/getusers',auth,Getusers);
module.exports=router;