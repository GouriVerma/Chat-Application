const jwt=require("jsonwebtoken");



const createToken=(user)=>{
    const payload={
        _id:user._id,
        userName:user.userName,
        email:user.email
    }

    return jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:'15m'});
}

const validateToken=(token)=>{
    const payload= jwt.verify(token,process.env.JWT_SECRET_KEY);
    return payload;
}

module.exports={createToken,validateToken};