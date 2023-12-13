const express = require("express");
const { chatData } = require("./data/data");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const messageRoutes = require("./routes/messageRoutes");

// app.use(cors({
//   origin : "http://localhost:5173"
// }));
app.use(cors());
app.use(express.json());
dotenv.config();
connectDB();
app.get("/", (req, res) => {
  return res.send(`Api is running`);
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 8000;
const server = app.listen(port, () =>
  console.log(`server started at localhost:${port}`)
);

const io = require("socket.io")(server, {
  cors: { origin: "http://localhost/5173" },
  pingTimeout: 600000,
});

io.on("connection", (socket) => {
  console.log("socket io is connected");
  socket.on('setup', (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat",(room)=> {
    socket.join(room);
    console.log("User joined Room: " +room);
  });

  socket.on("typing",(room)=> {
    socket.in(room).emit("typing");
  })

  socket.on("stop typing",(room)=> {
    socket.in(room).emit("stop typing");
  })

  socket.on("new message",(newMessageRecieved)=>{
    let chat = newMessageRecieved.chat;
    if(!chat.users){
      return console.log("Chat.users not defined");
    }

    chat.users.forEach(user=>{
      if(user._id === newMessageRecieved.sender._id)
        return;
      
      socket.in(user._id).emit("message received",newMessageRecieved);
    });
  })
});
