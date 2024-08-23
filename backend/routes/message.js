const {Router}=require("express");
const {handleFetchAllMessages,handleSendMessage}=require("../controllers/message");


const router=Router();

router.get("/:id",handleFetchAllMessages);
router.post("/:id",handleSendMessage);



module.exports=router;
