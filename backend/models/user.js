const {Schema,model}=require("mongoose");
const bcrypt=require("bcryptjs");



const userSchema=new Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        // validate:[validator.isEmail,"Invalid Email ID"],
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    },
    mobileNo:{
        type:Number,
    }


},{timeStamp:true})


//document middleware because this refers to document
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }   
    
    try {
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);       
        next();

    } catch (error) {
        next(error);
    }
})

//for document
userSchema.methods.matchPassword=async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const User=model("user",userSchema);



module.exports=User;