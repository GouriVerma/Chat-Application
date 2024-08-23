const {Router}=require("express");
const {handleCreateUser,handleUserLogin, handleDecodeToken,handleVerifyOTP, handleResendOTP}=require('../controllers/auth.js')
const router=Router();


router.post("/login",handleUserLogin);
router.post("/signup",handleCreateUser);
router.post("/decode-token",handleDecodeToken);
router.post("/verify-otp",handleVerifyOTP);
router.post("/resend-otp",handleResendOTP);


module.exports=router;