const {Router}=require("express");
const multer=require("multer");
const {handleSearchUsers,handleFetchUserDetails,handleUpdatePhoneNo,handleUploadImage}=require("../controllers/user");
const {checkAuth}=require("../middleware/auth");

const router=Router();

//Returns a StorageEngine implementation configured to store files on the local file system.

//A string or function may be specified to determine the destination directory, and a function to determine filenames. 
//If no options are set, files will be stored in the system's temporary directory with random 32 character filenames.
const storage=multer.diskStorage({destination:function(req,file,cb){
    cb(null,"../frontend/src/images")
},
filename: function(req,file,cb){
    cb(null,`${Date.now()}-${req.user._id}-${file.originalname}`)
}});
const upload=multer({storage});

// const storage=multer.diskStorage({});
// const upload=multer({storage:storage,limits:{fileSize:500000}});



router.get("/",checkAuth,handleFetchUserDetails);
router.put("/phone",checkAuth,handleUpdatePhoneNo);
router.get("/search-users",handleSearchUsers);
router.post("/profile-picture",checkAuth,upload.single("file"),handleUploadImage);






module.exports=router;