const btnSendMes = document.getElementById('submitMessage')
const btn = document.getElementById("btnFetch")

// const socketMessage = io('http://localhost:3000/api/chat/messages/');
const socket = io('http://localhost:3000');

const divMessages = document.getElementById('messages');


// var value;

btnSendMes.addEventListener('click', () => {
    // inputValue.addEventListener('input', () => {
    //     value = this.value;
    // })

    let inputValue = document.getElementById('insertMessage').value;
    socket.emit('message', {msgChat: `${inputValue}`})
    console.log(inputValue)
});

socket.on('sendFront', (data) => {
    const p = document.createElement('p')
    p.innerText = data.msgChat

    console.log(data)
    divMessages.appendChild(p)
})