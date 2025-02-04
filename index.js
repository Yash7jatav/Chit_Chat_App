const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
// const { connectDB } = require("./db/database_connection");
const authRoutes = require("./routes/auth.route");
const Messages = require("./models/message.model");
const User = require("./models/user.model");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//Socket io logic
io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  socket.on("send_message", async (data) => {
    const { sender, receiver, message } = data;
    const newMessage = new Messages({ sender, receiver, message });
    await newMessage.save();

    socket.broadcast.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });
});

//Database connection.
// connectDB();

//Routes.
app.use("/auth", authRoutes);

app.get("/messages", async (req, res) => {
  try {
    const { sender, receiver } = req.query;
    const messages = await Messages.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const { currentUser } = req.query;
    const users = await User.find({ username: { $ne: currentUser } });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = app;
