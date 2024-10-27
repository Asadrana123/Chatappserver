const messageModel = require("../Models/messageModel");
const ChatModel = require("../Models/chatModel");
const axios = require('axios');
const { GoogleGenerativeAI } = require("@google/generative-ai");
exports.sendMessageToAIController = async (req, res) => {
  const chatId = req.body.chatId;
  const message = req.body.content;
  const sender = req.user;
  try {
    const result = await messageModel.create({
      chat: chatId,
      content: message,
      sender: sender,
    })
     const data = await messageModel.find({
      _id: result._id
    }).populate({
      path: "chat",
      populate: {
        path: "users"
      }
    }).populate("sender");
    const result1 = await ChatModel.findByIdAndUpdate(chatId, {
      latestMessage: result,
    },
      { new: true }
    ).populate({
      path: "latestMessage",
      populate: {
        path: "sender"
      }
    });
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err });
  }
};
exports.getMessagefromAIcontrolller=async(req,res)=>{
  const chatId = req.body.chatId;
  try{
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const airesult = await model.generateContent(req.body.content);
    const result = await messageModel.create({
        chat: chatId,
        content: airesult.response.text(),
        sender: "67189a1916769aad12310513",
      })
       data = await messageModel.find({
        _id: result._id
      }).populate({
        path: "chat",
        populate: {
          path: "users"
        }
      }).populate("sender");
      const result1 = await ChatModel.findByIdAndUpdate(chatId, {
        latestMessage: result,
      },
        { new: true }
      ).populate({
        path: "latestMessage",
        populate: {
          path: "sender"
        }
      });
      return res.status(200).json({data});
    } catch (err) {
      console.log(err);
      return res.status(400).json({ err });
    }
}
exports.sendMessage = async (req, res) => {
  const chatId = req.body.chatId;
  const message = req.body.content;
  const sender = req.user;
  try {
    const result = await messageModel.create({
      chat: chatId,
      content: message,
      sender: sender,
    })
    const data = await messageModel.find({
      _id: result._id
    }).populate({
      path: "chat",
      populate: {
        path: "users"
      }
    }).populate("sender");
    const result1 = await ChatModel.findByIdAndUpdate(chatId, {
      latestMessage: result,
    },
      { new: true }
    ).populate({
      path: "latestMessage",
      populate: {
        path: "sender"
      }
    });
    return res.status(200).json({ data });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ err });
  }
};
exports.allMessage = async (req, res) => {
  const chat = req.params.chatId;
  try {
    const result = await messageModel.find({
      chat
    }).populate("chat").populate("sender");
    return res.status(200).json({ result });
  } catch (err) {
    return res.status(400).json({ err });
  }
};
