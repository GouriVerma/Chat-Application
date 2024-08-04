const Chat=require("../models/chat");
const Message=require("../models/message");
const expressAsyncHandler=require("express-async-handler");
const CustomError = require("../utils/error");


const handleFetchAllChatsOfUser=expressAsyncHandler(async(req,res,next)=>{
    // const _id=req.user._id;
    // if(!_id){
    //     next(new CustomError("User not authenticated",403));
    // }

    // const chats=await Chat.find({users:{$elemMatch:{$eq:_id}}}).populate("users","-password");
    // return res.status(200).json(chats);

    console.log(req.query);
    if(!req.user){
        next(new CustomError("User not authenticated",403));
    }

    const keyword=req?.query?.search;
    var chats=await Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).populate("users","-password");
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
        
        return res.status(200).json(chats);
    }

    else{
        var chats=await Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).populate("users","-password");
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

    console.log(chat);

    


    if(chat){
        chat=await chat.populate({path:"lastMessage.sender",select:"userName email profilePicture"});
        console.log(chat);
        return res.status(200).json(chat);
    }

    else{
        var newChat=await Chat.create({name:"sender",isGroupChat:false,users:[userId,req.user._id]});
        
        newChat=await newChat.populate("users","-password");
        console.log(newChat);
        return res.status(200).json(newChat);
    }


    


    
})

const handleFetchGroups=expressAsyncHandler(async(req,res,next)=>{
    const _id=req.user._id;
    if(!_id){
        next(new CustomError("User not authenticated",403));
    }

    var groupChats=await Chat.find({$and:[{users:{$elemMatch:{$eq:_id}}},{isGroupChat:true}]}).populate("users").populate("lastMessage").populate({path:"lastMessage.sender",select:"userName email profilePicture"});
    console.log(groupChats);
    

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


// const handleCreateNewChat=expressAsyncHandler(async(req,res,next)=>{
//     const {name,isGroupChat,users}=req.body;
//     const currUser=req.user._id;
//     const groupAdmin=null;
//     if(isGroupChat){
//         groupAdmin=req.user._id;
//     }
    
//     users.push(currUser);

//     console.log({name,isGroupChat,users,groupAdmin});
//     if(!name || !users || !groupAdmin){
//         return next(new CustomError("All information is not provided",400));
//     }

//     const chat=await Chat.create({name,isGroupChat,users,groupAdmin});
//     return res.status(200).json(chat);
// })


const handleDeleteChatorGroup=expressAsyncHandler(async(req,res,next)=>{
    const id=req.params.id;

})


module.exports={handleFetchAllChatsOfUser,handleAccessChat,handleFetchGroups,handleCreateGroup};