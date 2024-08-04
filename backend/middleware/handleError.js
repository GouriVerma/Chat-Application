const CustomError=require("../utils/error")

const handleError=(err,req,res,next)=>{
   // return res.json(err);
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";

    //wrong mongoDB ID error Mongoose could not convert a value to the type defined in the schema path. May be in a ValidationError class' errors property.
    if(err.name==="CastError"){
        const message=`Resource not found ${err.path}`;
        err=new CustomError(message,400);
    }

    //duplicate error
    if(err.code===11000){
        const message=`${Object.keys(err.keyValue)} already exists`;
        err=new CustomError(message,400);
    }

    return res.status(err.statusCode).json({error:err.message});
}

module.exports=handleError;