const {Schema,model}=require("mongoose");

const messageSchema=new Schema({
    sender:{
        type:Schema.ObjectId,
        ref:"user",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    chat:{
        type:Schema.ObjectId,
        ref:"chat"
    }
},{timeStamp:true})

const Message=model("message",messageSchema);

module.exports=Message;








