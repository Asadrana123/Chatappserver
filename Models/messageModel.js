const mongoose=require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatModel",
    },
    content: {
      type: String,
      trim: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    pic: {
      type: "String",
    },
  },
  {
    timestamps: true,
  }
);
const messageModel = mongoose.model("messageModel", messageSchema);
module.exports = messageModel;