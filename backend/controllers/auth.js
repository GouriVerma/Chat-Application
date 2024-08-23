const nodemailer=require("nodemailer");
const User=require("../models/user");
const { createToken, validateToken } = require("../service/auth");
const CustomError = require("../utils/error");
const expressAsyncHandler=require("express-async-handler");
const bcrypt=require("bcryptjs");
const UserOTPVerification = require("../models/userOTPVerification");
const sendEmail = require("../utils/sendEmail");

const handleUserLogin=async (req,res,next)=>{

    const {email,password}=req.body;
    if(!email || !password){
        next(new CustomError("Missing email or password",400));
    }

    const user=await User.findOne({email});
    if(!user){
        return next(new CustomError("This account is not registered",400));
    }

    

    const response=await user.matchPassword(password); //whole user returned

    if(!user.verified){
        await sendOTPVerificationMail(user);
    }


    if(response){
        const token=createToken(user);
        return res.status(200).json({_id:user._id,userName:user.userName,email:user.email,password:password,accessToken:token,verified:user.verified? true : false});
    }
    else{
        next(new CustomError("Invalid Email or Password",401));
    }

    
}


const sendOTPVerificationMail=expressAsyncHandler(async(user)=>{
    const otp=`${Math.floor(1000+Math.random()*9000)}`;
    const options={
        email:user.email,
        subject:`Email Verification By ChatApp`,
        html:`<p>Enter ${otp} in the app to verify your email address and complete the sign up process.</p><br />This code expires in 1 hour.`
    }


    const saltRounds=10;
    const hashedOTP=await bcrypt.hash(otp,saltRounds);
    const newUserVerification=await UserOTPVerification.create({userId:user._id,otp:hashedOTP,createdAt:Date.now(),expiresAt:Date.now()+3600000});
    await sendEmail(options);
    console.log("Email Sent successfully");
    
})


const handleCreateUser=expressAsyncHandler(async (req,res,next)=>{
    
    const {userName,email,password}=req.body;
    const user=await User.create({userName,email,password});
    const token=createToken(user);

    await sendOTPVerificationMail(user);
    return res.status(200).json({_id:user._id,userName:user.userName,email:user.email,password:password,accessToken:token});
})

const handleDecodeToken=expressAsyncHandler(async(req,res,next)=>{
    const {token}=req.body;
    // console.log(req.body);
    // console.log("Token ",token);
    try {
        const decodedPayload=validateToken(token);
        //console.log(decodedPayload);
        return res.status(200).json(decodedPayload);
    } catch (error) {
       // console.log(error);
        next(new CustomError("Token expired"))
    }
})

const handleVerifyOTP=expressAsyncHandler(async(req,res,next)=>{
    const {userId,otp}=req.body;
    console.log(req.body);
    if(!userId || !otp){
        return next(new CustomError("Missing OTP or user details",400));
    }


    const userOTPVerificationRecords=await UserOTPVerification.find({userId});

    if(userOTPVerificationRecords.length<=0){
        return next(new CustomError("Account details doesn't exist or has been verified already. Please try signing in",400));
    }
    const filteredOTP=userOTPVerificationRecords.filter((userVerifier)=>userVerifier.expiresAt>=Date.now());
    if(!filteredOTP){
        //all codes expired
        await UserOTPVerification.deleteMany({userId});
        return next(new CustomError("Code has expired. Please try again",400));
    }
    else{
        for (const record of filteredOTP) {
            const validOTP = await bcrypt.compare(otp, record.otp);
            if (validOTP) {
                // OTP is valid, send a response and return immediately
                await UserOTPVerification.deleteMany({userId});
                await User.updateOne({_id:userId},{verified:true});
                return res.status(200).json({ msg: "OTP verified" });
            }
        }
    }

    return next(new CustomError("Wrong OTP. Please try again",400));

    
})

const handleResendOTP=expressAsyncHandler(async(req,res,next)=>{
    const {userId,email}=req.body;
    if(!userId || !email){
        return next(new CustomError("Missing email or user details",400));
    }

    await UserOTPVerification.deleteMany({userId});

    const user=await User.findById(userId);
    if(!user){
        return next(new CustomError("No account found",404));
    }

    sendOTPVerificationMail(user);

    return res.status(200).json({msg:"Email sent successfully"});

 
})


module.exports={handleUserLogin,handleCreateUser,handleDecodeToken,handleVerifyOTP,handleResendOTP};