class CustomError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor); //captures the point in stack where error occured
    }

    
}

module.exports=CustomError;