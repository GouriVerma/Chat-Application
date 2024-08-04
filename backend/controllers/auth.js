const User=require("../models/user");
const { createToken } = require("../service/auth");
const CustomError = require("../utils/error");
const expressAsyncHandler=require("express-async-handler");

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
    if(response){
        const token=createToken(user);
        return res.status(200).json({userName:user.userName,email:user.email,password:password,accessToken:token});
    }
    else{
        next(new CustomError("Invalid Email or Password",401));
    }

    
}


const handleCreateUser=async (req,res,next)=>{
    
    const {userName,email,password}=req.body;
    

    try {
        const user=await User.create({userName,email,password});
        const token=createToken(user);
        return res.status(200).json({userName:user.userName,email:user.email,password:password,accessToken:token});
    } catch (error) {
        next(error);
    }
}

module.exports={handleUserLogin,handleCreateUser};