const Message=require("../models/message");
const Chat=require("../models/chat");
const expressAsyncHandler=require("express-async-handler"); //withour try catch block implement async functions and pass the error to next() if some comes
const CustomError = require("../utils/error");



const handleFetchAllMessages=expressAsyncHandler(async(req,res,next)=>{
    const id=req.params.id;

    const chat=await Chat.findById(id);
    if(!chat){
        return next(new CustomError("Chat not found",404));
    }

    const messages=await Message.find({chat:id}).populate("sender","-password").populate("chat").sort({updatedAt:1});
    return res.status(200).json(messages);
})

const handleSendMessage=(async(req,res,next)=>{
    const id=req.params.id;
    const {content}=req.body;
    var chat=await Chat.findById(id);
    if(!chat){
        return next(new CustomError("Chat not found",404));
    }

    var message=await Message.create({sender:req.user._id,message:content,chat:id});
    chat.lastMessage=message._id;
    chat=await chat.save();
    chat=await chat.populate({path:"lastMessage",populate:[{path:"sender"},{path:"chat"}]});
    message=await message.populate([{path:"sender"},{path:"chat"}]);

    return res.status(200).json(message);

})

module.exports={handleFetchAllMessages,handleSendMessage};