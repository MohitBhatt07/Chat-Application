const express = require("express");
const {chatData} = require('./data/data')
const app = express();
const port =8000;

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
app.listen(port,()=>console.log("server started at localhost:8000"));
