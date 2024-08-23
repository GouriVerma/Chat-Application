const {Schema,model}=require("mongoose");

const userOTPVerificationSchema=new Schema({
    userId:String,
    otp:String,
    createdAt:Date,
    expiresAt:Date
})

const UserOTPVerification=model("userOTPVerification",userOTPVerificationSchema);

module.exports=UserOTPVerification;