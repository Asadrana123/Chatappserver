const ChatModel = require("../Models/chatModel");
exports.sendNotification = async (req, res) => {
  const chatId = req.body.chatId;
  const value = req.body.value;
  console.log("hi");
  try{
    const data = await ChatModel.findByIdAndUpdate(chatId,{
      Notification:value,
    },
    {new:true}
    )
    return res.status(200).json(data);
  }catch(err){
       return res.status(400).json({err})
  }
}
exports.acessChat = async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    return res.sendStatus(400);
  }
  const chat = await ChatModel.findOne({
    isGroupChat: false,
    users: { $all: [req.user, userId] },
  })
    .populate("users")
    .populate({
         path:"latestMessage",
         populate:{
            path:"sender"
         }
    });
  if (chat) {
    return res.status(200).json({ chat, message: "alreadyfriend" });
  } else {
    try {
      const createchat = await ChatModel.create({
        chatName: req.body.name,
        isGroupChat: false,
        users: [req.user, userId],
        Notification: false,
        latestMessage:null
      });
      const chat = await ChatModel.findOne({
        _id: createchat._id,
      })
        .populate("users")
        .populate({
          path:"latestMessage",
          populate:{
             path:"sender"
          }
     });
      return res.status(200).json({ chat, message: "newfriend" });
    } catch (error) {
      return res.status(200).json(error);
    }
  }
};
exports.fetchChat = async (req, res) => {
  try {
    const allChats = await ChatModel.find({
      users: { $elemMatch: { $eq: req.user } },
    })
      .populate("users")
      .populate({
        path:"latestMessage",
        populate:{
           path:"sender"
        }
   })
      .sort({ updatedAt: -1 });
    return res.status(200).json(allChats);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }
};
exports.createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).json({ message: "please fill all the fields" });
  }
  if (req.body.users.length < 2) return res.status(400).json({ message: "Atleast two users required" });
  req.body.users.push(req.user);
  try {
    const group = await ChatModel.create({
      isGroupChat: true,
      groupAdmin: req.user,
      users: req.body.users,
      chatName: req.body.name,
      Notification: false,
    });
    const createdGroup = await ChatModel.findOne({ _id: group._id }).populate(
      "users"
    );
    return res.status(200).json({ createdGroup });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
exports.renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  try {
    const withNewName = await ChatModel.findByIdAndUpdate(
      chatId,
      { chatName },
      { new: true }
    ).populate("users");
    return res.send(withNewName);
  } catch (error) {
    return res.send(error);
  }
};
exports.addUser = async (req, res) => {
  const { chatId, userId } = req.body;
  console.log(chatId);
  try {
    const updatedGroup = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $push: { users: userId },
      },
      { new: true }
    ).populate("users");
    return res.send(updatedGroup);
  } catch (error) {
    return res.send(error);
  }
};
exports.removeUser = async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const updatedGroup = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      { new: true }
    ).populate("users");
    return res.send(updatedGroup);
  } catch (error) {
    return res.send(error);
  }
};
