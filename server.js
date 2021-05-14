const express = require("express");
const app = express();
const socket = require("socket.io");

// const server = app.listen(3030, () => {
//   console.log("Listening on 3030");
// });

const server = app.listen(3048, function(){
    console.log("Express server listening on port %d in %s mode", 3048);
  });

app.use(express.static("public"));

//Socket Setup

const io = socket(server, {
    cors: {
        origins: ['https://simple-chit-chat-app.herokuapp.com/']
    }
});

io.on("connection", (socket) => {
  console.log("Made socket connection");
  console.log(socket.id);

  socket.on("chat", (data) => {
    console.log("[INFO] : Message received.");
    console.log("[INFO] : Msg From : " + data.username);
    console.log("[INFO] : Message : " + data.msg);

    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data)=> {
    socket.broadcast.emit("typing", data);
  });
    
    socket.on("nottyping", (data) => {
        console.log("not typing called");
        socket.broadcast.emit("nottyping", data);
  })
});
