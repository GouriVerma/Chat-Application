const { validateToken }= require("../service/auth");
const CustomError = require("../utils/error");


const checkAuth=(req,res,next)=>{
    const authHeader=req?.headers?.authorization;
    
    if(!authHeader){
        return next(new CustomError("User not Authenticated",403));
    }

    

    const token=authHeader.split("Bearer ")[1];
    try {
        const result=validateToken(token);
        req.user=result;

    } catch (error) {
        //console.log(error);
        next(new CustomError("User not Authenticated",403));
    }

    next();
}

module.exports={checkAuth};