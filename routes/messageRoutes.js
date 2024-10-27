const express = require("express");
const auth = require("../middleware/auth");
const {sendMessage,allMessage, sendMessageToAIController,getMessagefromAIcontrolller}=require("../controller/messageController")
const router = express.Router();
router.post('/sendMessage',auth,sendMessage);
router.get("/:chatId", auth, allMessage);
router.post("/send-chatbot",auth,sendMessageToAIController);
router.post("/get-chatbot",auth,getMessagefromAIcontrolller);
module.exports=router;