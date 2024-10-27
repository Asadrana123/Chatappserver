import messageModel from "../Models/messageModel.js"; // Ensure .js is included
import ChatModel from "../Models/chatModel.js"; // Ensure .js is included
import { GoogleGenerativeAI } from "@google/generative-ai";
export const sendMessageToAIController = async (req, res) => {
  const chatId = req.body.chatId;
  const message = req.body.content;
  const sender = req.user;
  try {
    const result = await messageModel.create({
      chat: chatId,
      content: message,
      sender: sender,
    });
    const data = await messageModel.find({ _id: result._id })
      .populate({
        path: "chat",
        populate: {
          path: "users"
        }
      })
      .populate("sender");
    await ChatModel.findByIdAndUpdate(chatId, {
      latestMessage: result,
    }, { new: true })
      .populate({
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

export const getMessagefromAIcontrolller = async (req, res) => {
  const chatId = req.body.chatId;
  console.log(req.body.content);
  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const airesult = await model.generateContent(req.body.content);

    const result = await messageModel.create({
      chat: chatId,
      content: airesult.response.text(),
      sender: "67189a1916769aad12310513", // This should be dynamic in a real scenario
    });
    
    const data = await messageModel.find({ _id: result._id })
      .populate({
        path: "chat",
        populate: {
          path: "users"
        }
      })
      .populate("sender");

    await ChatModel.findByIdAndUpdate(chatId, {
      latestMessage: result,
    }, { new: true })
      .populate({
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

export const sendMessage = async (req, res) => {
  const chatId = req.body.chatId;
  const message = req.body.content;
  const sender = req.user;
  try {
    const result = await messageModel.create({
      chat: chatId,
      content: message,
      sender: sender,
    });
    
    const data = await messageModel.find({ _id: result._id })
      .populate({
        path: "chat",
        populate: {
          path: "users"
        }
      })
      .populate("sender");

    await ChatModel.findByIdAndUpdate(chatId, {
      latestMessage: result,
    }, { new: true })
      .populate({
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

export const allMessage = async (req, res) => {
  const chat = req.params.chatId;
  try {
    const result = await messageModel.find({ chat })
      .populate("chat")
      .populate("sender");

    return res.status(200).json({ result });
  } catch (err) {
    return res.status(400).json({ err });
  }
};
