const {Router}=require("express");
const {handleFetchAllChatsOfUser,handleAccessChat,handleFetchGroups, handleCreateGroup,handleDeleteGroup, handleAddUserToGroup}=require("../controllers/chat");
const router=Router();


router.get("/",handleFetchAllChatsOfUser);
router.post("/",handleAccessChat);
router.get("/groups",handleFetchGroups);
router.post("/create-group",handleCreateGroup);
router.delete("/delete-group",handleDeleteGroup);
router.put("/add-user",handleAddUserToGroup);


module.exports=router;