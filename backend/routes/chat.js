const {Router}=require("express");
const {handleFetchAllChatsOfUser,handleAccessChat,handleFetchGroups, handleCreateGroup}=require("../controllers/chat");
const router=Router();


router.get("/",handleFetchAllChatsOfUser);
router.post("/",handleAccessChat);
router.get("/groups",handleFetchGroups);
router.post("/create-group",handleCreateGroup);


module.exports=router;