const express=require("express");
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const cors=require("cors");

const app=express();
dotenv.config();
const PORT=process.env.PORT || 8000;
const authRouter=require("./routes/auth");
const userRouter=require("./routes/user");
const chatRouter=require("./routes/chat");

const {checkAuth}=require("./middleware/auth");

const handleError=require("./middleware/handleError");

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));


//middleware
app.use(express.json()); //without this express data won't be parsed
app.use(cors()); //needed for frontend to access resources from other domain




app.use("/api/auth",authRouter);
app.use("/api/user",checkAuth,userRouter);
app.use("/api/chat",checkAuth,chatRouter);






app.use(handleError); //need to pass response from this, that's why after all calls
app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`));