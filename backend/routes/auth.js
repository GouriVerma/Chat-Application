const {Router}=require("express");
const {handleCreateUser,handleUserLogin}=require('../controllers/auth.js')
const router=Router();


router.post("/login",handleUserLogin);
router.post("/signup",handleCreateUser);


module.exports=router;