//make connection
port = 3048;
const socket = io.connect('https://simple-chit-chat-app.herokuapp.com/'+port+'/'); 


const msg = document.getElementById("msg");
const username = document.getElementById("username");
const btn = document.getElementById("btn-send");
const output = document.getElementById("output");
const feedback = document.getElementById("feedback");


btn.addEventListener('click', () => {
    socket.emit('chat', {
        msg: msg.value,
        username : username.value
    })
})

socket.on('chat', (data) => {
    output.innerHTML += '<p>' + data.username + ":" + data.msg + '</p>';
    feedback.innerHTML = '';

})

msg.addEventListener('keypress', () => {
    socket.emit('typing', username.value)
})

msg.addEventListener('keyup', () => {
    socket.emit('nottyping', username.value)
})

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});

socket.on('nottyping', function(data){
    feedback.innerHTML = '';
});