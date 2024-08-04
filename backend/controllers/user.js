const User = require("../models/user");
const expressAsyncHandler=require("express-async-handler"); //withour try catch block implement async functions and pass the error to next() if some comes


const handleSearchUsers=(async (req,res,next)=>{
    console.log(req.query);
    const keyword=req?.query?.search;

    if(keyword){
        const searchOptions={userName:{$regex:'^'+keyword,$options:'i'}};
        console.log("user ",req.user._id);
        const users=await User.find(searchOptions).find({_id:{$ne:req.user._id}});
        return res.status(200).json(users);
    }

    else{
        const users=await User.find().find({_id:{$ne:req.user._id}});
        return res.status(200).json(users);
    }

});

module.exports={handleSearchUsers};