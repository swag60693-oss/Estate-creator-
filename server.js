const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let messages = [];
app.get("/messages",(req,res)=>res.json(messages));

const server = http.createServer(app);
const io = new Server(server,{cors:{origin:"*"}});
io.on("connection",socket=>{socket.on("sendMessage",msg=>{messages.push(msg); io.emit("newMessage",msg);});});

server.listen(3000,()=>console.log("Chat server running on port 3000"));
