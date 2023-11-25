//port 3000
const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
    // origins: ["http://*", "file://*"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send-message", (message, room) => {
    console.log(`${socket.id}, room: ${room}, message: ${message}`);

    if (room === "") {
      socket.broadcast.emit("receive-message", message);
    } else {
      socket.to(room).emit("receive-message", message);
    }
  });

  socket.on("join-room", (room, callBack) => {
    socket.join(room);
    callBack(`${socket.id} joined room: ${room}`);
  });
});
