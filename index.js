import express, { urlencoded, json } from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import fetch from "node-fetch";
import connectdb from "./Config/db.js"; // Ensure your db.js is also an ESM file
// Polyfill fetch for environments that don't support it
if (!globalThis.fetch) {
  globalThis.fetch = fetch;
}

// Initialize dotenv configuration

// Create an Express app
const app = express();

// Connect to the database
connectdb();

// Set the server port
const port = process.env.PORT || 8000; // Use uppercase for PORT

// Middleware setup
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json()); // for JSON data

// Basic route for testing
app.use("/", (req, res, next) => {
  // res.json({ name: "jhon" });
  next();
});

// Route handlers
app.use("/api/user", userRoutes);
app.use("/api/asad", (req, res) => {
  res.json({ name: "asad" });
});
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Set up Socket.IO with the server
import { Server } from "socket.io"; // Import the Server class from socket.io

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://chatappserver-mauve.vercel.app",
  },
});

// Socket.IO event handling
io.on("connection", (socket) => {
  socket.on("setup", (user) => {
    socket.join(user.id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined chat");
  });

  socket.on("newMessage", (messageData) => {
    const chat = messageData.chat;
    console.log(messageData);
    chat.users.forEach((element) => {
      if (element._id !== messageData.sender._id) {
        socket.in(element._id).emit("receivedMessage", messageData);
      }
    });
  });

  socket.on("typing", (chat) => {
    const userId = chat.userId;
    socket.to(chat._id).except(userId).emit("typing");
  });

  socket.on("stop typing", (chat) => {
    const userId = chat.userId;
    socket.to(chat._id).except(userId).emit("stop typing");
  });

  socket.off("setup", () => {
    console.log("User disconnected");
    socket.leave(user.id);
  });
});
