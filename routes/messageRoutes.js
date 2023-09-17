const express = require("express");
const auth = require("../middleware/auth");
const {sendMessage,allMessage}=require("../controller/messageController")
const router = express.Router();
router.post('/sendMessage',auth,sendMessage);
router.get("/:chatId", auth, allMessage);
module.exports=router;