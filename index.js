const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
dotenv.config();
app.use(cors());
const connectdb = require("./Config/db");
connectdb();
const port = process.env.port || 8000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());//for json data;

app.use('/', (req, res, next) => {
  //res.json({name:"jhon"});
  next();
})
app.use('/api/user', userRoutes);
app.use("/api/asad", (req, res) => {
  res.json({ name: "asad" });
})
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
//app.use("/api/message", messageRoutes);
const server = app.listen(port, () => {
  console.log(`server running on ${port}`);
})
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://chatappserver-mauve.vercel.app"
  }
});
io.on("connection", (socket) => {
  socket.on("setup", (user) => {
    socket.join(user.id);
    socket.emit("connected");
  })
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined chat");
  })
  socket.on("newMessage", (messageData) => {
    const chat = messageData.chat;
    console.log(messageData);
    //socket.to(chat._id).except(userid).emit('recievedMessage', messageData);
    chat.users.forEach((element) => {
      if (element._id !== messageData.sender._id) {
        socket.in(element._id).emit('recievedMessage', messageData)
      }
    });
  })
  socket.on("typing", (chat) => {
    const userId = chat.userId
    socket.to(chat._id).except(userId).emit("typing");
    //socket.in(chat).emit("typing");
  })
  socket.on("stop typing", (chat) => {
    //socket.in(chat).emit("stop typing")
    const userId = chat.userId
    socket.to(chat._id).except(userId).emit("stop typing");
  })
  socket.off("setup", () => {
    console.log("user disconnected");
    socket.leave(user.id);
  })
})
