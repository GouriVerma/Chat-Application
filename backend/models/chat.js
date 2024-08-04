const {Schema,model}=require("mongoose");

const chatSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    isGroupChat:{
        type:Boolean,
        default:false,
        required:true
    },
    users:[
        {
            type:Schema.ObjectId,
            ref:"user",
            required:true
        }
    ],
    groupAdmin:{
        type:Schema.ObjectId,
        ref:"user",
        
    },
    lastMessage:{
        type:Schema.ObjectId,
        ref:"message",
    },
    groupProfile:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    }
},{timeStamp:true})

const Chat=model("chat",chatSchema);

module.exports=Chat;