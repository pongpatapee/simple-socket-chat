const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  // res.send("<h1>Hello Silly Goose(NTS)!</h1>");
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`user: ${socket.id} connected`);

  socket.on("chat message", (msg) => {
    console.log(`${socket.id} message: ${msg}`);

    //emit message to other users
    io.emit("chat message", { sender: socket.id, msg: msg });
  });

  socket.on("disconnect", () => {
    console.log(`user: ${socket.id} disconnected`);
  });
});

server.listen(3000, () => {
  console.log("Listening on *:3000");
});
