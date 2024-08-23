const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const cors=require("cors");
const {Server}=require("socket.io");
const http=require("http");
const cloudinary = require('cloudinary').v2;

const app=express();
dotenv.config();
const PORT=process.env.PORT || 8000;
const authRouter=require("./routes/auth");
const userRouter=require("./routes/user");
const chatRouter=require("./routes/chat");
const messageRouter=require("./routes/message");

const {checkAuth,justCheckAuth}=require("./middleware/auth");

const handleError=require("./middleware/handleError");

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));


//middleware
app.use(express.json()); //without this express data won't be parsed
app.use(cors()); //needed for frontend to access resources from other domain
// app.use(express.static())

//cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});


app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/chat",checkAuth,chatRouter);
app.use("/api/message",checkAuth,messageRouter);






app.use(handleError); //need to pass response from this, that's why after all calls

const server=app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`));
const io=new Server(server,{pingTimeout:60000,cors:{origin:"*"}});

let onlineUsers=[];

io.on("connection",(socket)=>{
    console.log("socket.io connection establised"); //establishing connection

    socket.on("setup",(user)=>{
        socket.join(user._id); //each user has different room identified by its id, connects with setup
        console.log("connected",user._id);
        
        if(user._id && !onlineUsers.some(userHere=>userHere.userId==user._id)){
            onlineUsers.push({userId:user._id,socketId:socket.id});
            
        }
        console.log(onlineUsers);
        socket.emit("connection",user._id);
        socket.emit("onlineUsers",onlineUsers);
    })

    socket.on("join chat",(room)=>{ //joins user to chatroom
        socket.join(room); 
        console.log("user joined room ",room);
    })

    socket.on("typing",(info)=>socket.in(info.chatId).emit("typing",info.userId));
    socket.on("not typing",(room)=>socket.in(room).emit("not typing"));

    socket.on("new message",(newMessage)=>{
        // console.log("hi");
        // console.log(newMessage);
        var chat=newMessage.chat;
        if(!chat.users){
            return console.log("chat.users not defined");
        }
        chat.users.forEach((userId)=>{
            if(userId==newMessage.sender._id){
                return;
            }
            socket.in(userId).emit("message received",newMessage); //emit messages in user room
            socket.in(userId).emit("notification received",newMessage); //emit messages in user room
        })

        // socket.in(chat._id).emit("message received",newMessage);
    })

    socket.on("disconnect",()=>{
        console.log("disconnected");
        onlineUsers=onlineUsers.filter((user)=>user.socketId!==socket.id);
        console.log(onlineUsers);
        socket.emit("onlineUsers",onlineUsers);
    })

    
})


