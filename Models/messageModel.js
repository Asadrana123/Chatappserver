import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatModel",
      required: true, // Corrected from require to required
    },
    content: {
      type: String,
      trim: true,
      required: true, // Corrected from require to required
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true, // Corrected from require to required
    },
    pic: {
      type: String, // No need for quotes around "String"
    },
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("messageModel", messageSchema);
export default messageModel;
