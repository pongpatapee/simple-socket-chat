// import { io } from "socket.io-client";

function displayMessage(message) {
  const messages = document.getElementById("message-container");
  const item = document.createElement("div");
  item.textContent = message;
  messages.appendChild(item);
}

const form = document.getElementById("form");
const messageInput = document.getElementById("message-input");
// const messageBtn = document.getElementById("message-btn");
const roomInput = document.getElementById("room-input");
const joinBtn = document.getElementById("join-btn");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  displayMessage(`you connected with ${socket.id}`);
});

socket.on("receive-message", (message) => {
  displayMessage(message);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = messageInput.value;
  const room = roomInput.value;

  if (!message) return;

  socket.emit("send-message", message, room);
  displayMessage(message);
  messageInput.value = "";
});

joinBtn.addEventListener("click", (e) => {
  const room = roomInput.value;
  socket.emit("join-room", room, (message) => {
    displayMessage(message);
  });
});
