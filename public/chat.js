//make connection
port = 80;

// import srv from '../server';

// console.log("my port is" + srv);
    const socket = io.connect('https://simple-chit-chat-app.herokuapp.com'); 


const msg = document.getElementById("msg");
const username = document.getElementById("username");
const btn = document.getElementById("btn-send");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");


btn.addEventListener('click', () => {
    console.log("Send button is clicked");
    try {
        socket.emit('chat', {
            msg: msg.value,
            username : username.value
        })
        
    } catch (error) {
        console.log(error);
    }
})

socket.on('chat', (data) => {
    output.innerHTML += '<p>' + data.username + ":" + data.msg + '</p>';
    msg.value = '';
})

msg.addEventListener('keypress', () => {
    socket.emit('typing', username.value)
})

msg.addEventListener('keyup', () => {
    setTimeout(() => {
        socket.emit('nottyping', username.value);
    }, 1000);
})


socket.on('typing', function (data) {
    console.log("Typing received from server" + data);
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('nottyping', function (data) {
    console.log("NotTyping received from server" + data);
    feedback.innerHTML = '';
});
