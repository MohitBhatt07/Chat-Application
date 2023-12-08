const express = require("express");
const {chatData} = require('./data/data');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require('./routes/chatRoutes');
const {notFound , errorHandler} = require("./middleware/errorMiddleware");
const messageRoutes = require("./routes/messageRoutes");

app.use(cors({
  origin : "http://localhost:5173"
}));
app.use(express.json());
dotenv.config();
connectDB();
app.get("/", (req, res) => {
  return res.send(`Api is running`);       
});   

app.use('/api/user' , userRoutes);
app.use('/api/chat' , chatRoutes);
app.use('/api/message' ,messageRoutes);

app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`server started at localhost:${port}`));
