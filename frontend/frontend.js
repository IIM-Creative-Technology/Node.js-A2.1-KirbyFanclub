const btnSocket = document.getElementById('btnSocket')

const socket = io('http://localhost:3000');

const ulMessageDataText = document.getElementById('ulMessageDataText')

btnSocket.addEventListener('click', () => {
    socket.emit('message', {msg: 'Bonjour'})
});

socket.on('sendFront', (data) => {
    const li = document.createElement('li')
    li.innerText = data.msg

    console.log(data)
    ulMessageDataText.appendChild(li)
})




const btnSendMes = document.getElementById('submitMessage')

const socketMessage = io('http://localhost:3000/api/chat/messages/');

const divMessages = document.getElementById('messages');


// var value;

btnSendMes.addEventListener('click', () => {
    // inputValue.addEventListener('input', () => {
    //     value = this.value;
    // })

    let inputValue = document.getElementById('insertMessage').value;
    socketMessage.emit('message', {msgChat: `${inputValue}`})
    console.log(inputValue)
});

socketMessage.on('sendFront', (data) => {
    const p = document.createElement('p')
    p.innerText = data.msgChat

    console.log(data)
    divMessages.appendChild(p)
})