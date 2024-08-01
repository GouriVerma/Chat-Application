const express=require("express");


const PORT=8000;

const app=express();

app.listen(PORT,()=>console.log(`Server is running on PORT ${PORT}`));