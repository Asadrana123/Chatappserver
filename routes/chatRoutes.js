import express from "express";
import auth from "../middleware/auth.js"; // Ensure .js is included for ES module
import {
  acessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addUser,
  removeUser,
  sendNotification
} from "../controller/chatController.js"; // Ensure .js is included for ES module

const router = express.Router();

router.post("/", auth, acessChat);
router.get("/", auth, fetchChat);
router.post("/groupChat", auth, createGroupChat);
router.put("/renameChat", auth, renameGroup);
router.put("/addUser", auth, addUser);
router.put("/removeUser", auth, removeUser);
router.put("/sendNotification", auth, sendNotification);

export default router; // Use export default for ES module
