const express = require("express");

const app = express();
const port =8000;
app.get("/", (req, res) => {
  return res.send(`<h1>This is home page</h1>`);
});

app.get('/about',(req,res)=>{
  return res.send(`<h1>This is about page</h1>`);
})

app.listen(port,()=>console.log("server started at localhost:8000"));
