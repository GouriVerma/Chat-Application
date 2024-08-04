const {Router}=require("express");
const {handleSearchUsers}=require("../controllers/user");

const router=Router();

router.get("/search-users",handleSearchUsers);





module.exports=router;