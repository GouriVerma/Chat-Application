const User = require("../models/user");
const expressAsyncHandler=require("express-async-handler"); //withour try catch block implement async functions and pass the error to next() if some comes
const CustomError = require("../utils/error");
const {uploadFile} =require("../utils/uploadFile");


const handleSearchUsers=(async (req,res,next)=>{
  //  console.log(req.query);
    const keyword=req?.query?.search;
    
    
    // if(keyword){
    //     const searchOptions={userName:{$regex:'^'+keyword,$options:'i'}};
    //     console.log("user ",req.user._id);
    //     const users=await User.find(searchOptions);
    //     return res.status(200).json(users);
    // }

    
    const users=await User.find();
    return res.status(200).json(users);
    
    

});

const handleFetchUserDetails=expressAsyncHandler(async(req,res,next)=>{
  if(!req.user){
    return next(new CustomError("User not authenticated",403))
  }

  const user=await User.findById(req.user._id);
  if(!user){
    return next(new CustomError("User not found",404));
  }

  return res.status(200).json(user);
})

const handleUpdatePhoneNo=expressAsyncHandler(async(req,res,next)=>{
 
  if(!req.user){
    return next(new CustomError("User not authenticated",403))
  }

  const {phoneNo}=req.body;
  if(!phoneNo){
    return next(new CustomError("Phone no missing",401));
  }

  const user=await User.findById(req.user._id);
  if(!user){
    return next(new CustomError("User not found",404));
  }

  user.mobileNo=phoneNo;
  const userUpdtd=await user.save({new:true});
  return res.status(200).json(userUpdtd);
})

const handleUploadImage=expressAsyncHandler(async(req,res,next)=>{
  if(!req.user){
    return next(new CustomError("User not authenticated",403))
  }

  
  const user=await User.findById(req.user._id);

  if(!req.file){
    return next(new CustomError("File not provided",403));
  }

  const fileName=req.file?.filename;

  const file=req.file;
  const upload = await uploadFile(file.path);
  console.log(upload);
  user.profilePicture={public_id:upload.public_id,url:upload.url};
  // user.profilePicture.public_id=upload.public_id;
  // user.profilePicture.url=upload.url;

  // user.profilePicture=fileName;
  const userUpdtd=await user.save({new:true});
  return res.status(200).json(userUpdtd);

})

module.exports={handleSearchUsers,handleFetchUserDetails,handleUpdatePhoneNo,handleUploadImage};