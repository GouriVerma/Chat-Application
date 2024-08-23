const Chat=require("../models/chat");
const Message=require("../models/message");
const expressAsyncHandler=require("express-async-handler");
const CustomError = require("../utils/error");
const User = require("../models/user");


//left
const handleFetchAllChatsOfUser=expressAsyncHandler(async(req,res,next)=>{
    
    // const chats=await Chat.find({users:{$elemMatch:{$eq:_id}}}).populate("users","-password");
    // return res.status(200).json(chats);

   
    if(!req.user){
        next(new CustomError("User not authenticated",403));
    }

    const keyword=req?.query?.search;
    // var chats=await Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).populate("users","-password").populate("lastMessage");
   // return res.status(200).json(chats);

    if(keyword){
        // var chats=await Chat.find({$and:
        //     [
        //         {users:{$elemMatch:{$eq:req.user._id}}},
        //         {$or:[
        //             {$and:[{isGroupChat:true},{name:{$regex:"^"+keyword,$options:'i'}}]},
        //             {$and:[{isGroupChat:false},{users:{$elemMatch:{userName:{$regex:"^"+keyword,$options:'i'}},{_id:{$ne:req.user._id}}}}]},
        //         ]}
        //     ]}).populate("users","-password");

        const chats = await Chat.find({
            $and: [
              { users: { $elemMatch: { $eq: req.user._id } } },
              { users: { $elemMatch: { userName: "test3" } } }
            ]
          })
          .populate("users", "-password")
          .populate({
            path: "lastMessage",
            populate:{path:"sender",select: "userName email profilePicture"}
          });
        
        return res.status(200).json(chats);
    }

    else{
        var chats=await Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).populate("users","-password").populate({path:"lastMessage",populate:{path:"sender",select:"-password"}}).sort({updatedAt:-1});
        return res.status(200).json(chats);
    }

})

const handleAccessChat=expressAsyncHandler(async(req,res,next)=>{
    const {userId}=req.body;
    if(!req.user){
        next(new CustomError("User not authenticated",403));
    }

    var chat=await Chat.findOne({$and:[
        {isGroupChat:false},
        {users:{$elemMatch:{$eq:userId}}},
        {users:{$elemMatch:{$eq:req.user._id}}},
    ]}).populate("users","-password").populate("lastMessage");


    


    if(chat){
        chat=await chat.populate({path:"lastMessage",populate:{path:"sender",select:"-password"}});
  
        return res.status(200).json(chat);
    }

    else{
        var newChat=await Chat.create({name:"inperson",isGroupChat:false,users:[userId,req.user._id]});
        
        newChat=await newChat.populate("users","-password");
 
        return res.status(200).json(newChat);
    }


    


    
})

const handleFetchGroups=expressAsyncHandler(async(req,res,next)=>{
    const _id=req.user._id;
    if(!_id){
        next(new CustomError("User not authenticated",403));
    }

    var groupChats=await Chat.find({$and:[{users:{$elemMatch:{$eq:_id}}},{isGroupChat:true}]}).populate("users").populate({path:"lastMessage",populate:{path:"sender",select:"-password"}}).sort({updatedAt:-1});

    

    return res.status(200).json(groupChats);

})


const handleCreateGroup=expressAsyncHandler(async(req,res,next)=>{
    const {name,users}=req.body;
    if(!name || !users){
        return next(new CustomError("Insufficient Information available",400));
    }

    const _id=req.user._id;
    if(!_id){
        return next(new CustomError("User not authenticated",403));
    }

    users.push(_id);
    var newGroup=await Chat.create({name,users,isGroupChat:true,groupAdmin:_id});
    newGroup=await newGroup.populate("users","-password");

    return res.status(200).json(newGroup);
    
})




const handleDeleteGroup=expressAsyncHandler(async(req,res,next)=>{
    if(!req.user._id){
        return next(new CustomError("User not authenticated",403));
    }

    const {groupId}=req.body;
    const group=await Chat.findById(groupId);

    if(!group){
        return next(new CustomError("Group not found",404));
    }

    if(!group.isGroupChat){
        return next(new CustomError("Only groups can be deleted",400));
    }

    
    if(group.groupAdmin.toString()!==req.user._id){
        return next(new CustomError("Only admins can delete group",400));
    }

    //delete all messages of group

    //delete group
    await Chat.findByIdAndDelete(groupId);
    return res.status(200).json({msg:"Group Deleted Successfully"});

})

const handleAddUserToGroup=expressAsyncHandler(async(req,res,next)=>{
    if(!req.user._id){
        return next(new CustomError("User not authenticated",403));
    }

    const {userId, groupId}=req.body;
    if(!userId || !groupId){
        return next(new CustomError("Missing information",400));
    }

    const group=await Chat.findById(groupId);

    if(!group){
        return next(new CustomError("Group not found",404));
    }

    //will not be used, we will handle it in frontend
    if(!group.isGroupChat){
        return next(new CustomError("Members can be added only in groups",400));
    }

    if(group.groupAdmin.toString()!==req.user._id){
        return next(new CustomError("Only admins can add members to group",400));
    }

    const user=User.findById(userId);
    if(!user){
        return next("User not found",404);
    }

    //handle in frontend
    if(group.users.toString().includes(userId)){
        return next(new CustomError("User already added",400));
    }

    group.users.push(userId);
    const updatedGroup=await group.save();
    // updatedGroup=await updatedGroup.populate("users","-password");

    return res.status(200).json(updatedGroup);

})


module.exports={handleFetchAllChatsOfUser,handleAccessChat,handleFetchGroups,handleCreateGroup,handleDeleteGroup,handleAddUserToGroup};