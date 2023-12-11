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
    console.log(userData._id);
    socket.emit("connected");
  });

  socket.on('join chat',(room)=> {
    socket.join(room);
    console.log("User joined Room: " +room);
  })
});
