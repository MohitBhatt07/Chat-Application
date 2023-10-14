const express = require("express");
const {chatData} = require('./data/data');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const connectDB = require("./config/db");
const router = require("./routes/userRoutes")

app.use(cors());
app.use(express.json());
dotenv.config();
connectDB();
app.get("/", (req, res) => {
  return res.send(`Api is running`);       
});   

app.get('/api/chat',(req,res)=>{
  return res.send(chatData);
})

app.get('/api/chat/:id',(req,res)=>{
  const singleChat = chatData.find((chat)=>chat.id === req.params.id);
  return res.send(singleChat);
})

const port = process.env.PORT || 5000;
app.listen(port,()=>console.log(`server started at localhost:${port}`));
