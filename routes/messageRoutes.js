import express from "express";
import auth from "../middleware/auth.js"; // Ensure .js is included for ES module
import {
  sendMessage,
  allMessage,
  sendMessageToAIController,
  getMessagefromAIcontrolller
} from "../controller/messageController.js"; // Ensure .js is included for ES module

const router = express.Router();

router.post('/sendMessage', auth, sendMessage);
router.get("/:chatId", auth, allMessage);
router.post("/send-chatbot", auth, sendMessageToAIController);
router.post("/get-chatbot", auth, getMessagefromAIcontrolller);

export default router; // Use export default for ES module
