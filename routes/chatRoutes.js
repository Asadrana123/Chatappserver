const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const {
  acessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addUser,
  removeUser,
  sendNotification
} = require("../controller/chatController");
router.post("/", auth, acessChat);
router.get("/", auth, fetchChat);
router.post("/groupChat", auth, createGroupChat);
router.put("/renameChat", auth, renameGroup);
router.put("/addUser", auth, addUser);
router.put("/removeUser", auth, removeUser);
router.put('/sendNotification',auth,sendNotification);
module.exports = router;
 