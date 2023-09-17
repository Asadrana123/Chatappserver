const mongoose=require("mongoose");
const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },
    Notification:{
      type:Boolean,
       deafault:false,
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "messageModel",
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const ChatModel = mongoose.model("ChatModel", chatSchema);
module.exports=ChatModel;