const cloudinary = require('cloudinary').v2;

const uploadFile=async(filepath)=>{
    try {
        const res=await cloudinary.uploader.upload(filepath);
       console.log(res);
        return res;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={uploadFile};