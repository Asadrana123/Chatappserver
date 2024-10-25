const express = require("express");
const auth = require("../middleware/auth");
const {sendMessage,allMessage, sendMessageToAIController}=require("../controller/messageController")
const router = express.Router();
router.post('/sendMessage',auth,sendMessage);
router.get("/:chatId", auth, allMessage);
router.post("/aichat",auth,sendMessageToAIController);
module.exports=router;