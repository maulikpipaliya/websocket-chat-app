const express = require('express');
const app = express();
const socket = require('socket.io');

const server = app.listen(3030, () => {
    console.log("Listening on 3030");
});

app.use(express.static('public'));


//Socket Setup 


const io = socket(server); 

io.on('connection', (socket) => {
    console.log("Made socket connection");
    console.log(socket.id);
})