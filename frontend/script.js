const btnSendMes = document.getElementById('submitMessage')
const submitBt = document.getElementById('submitBt')
const submitSignUp = document.getElementById('submitSignUp')

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
submitBt.addEventListener("click", () => {
    let ps = document.querySelector('.pseuso')
    let pass = document.querySelector('.password')
    let email = document.querySelector('.email')
    fetch("http://localhost:3000/api/user", {
        method: "POST",
        body: JSON.stringify({
            'firstName': ps.value,
            'password': pass.value,
            'email': email.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        consol.log(res)
        return res.json()
    })
});

submitSignUp.addEventListener("click", () => {
    let Pseudo = document.querySelector('.pseuso')
    let password = document.querySelector('.password')
    fetch(`http://localhost:3000/api/user/${Pseudo.value}/${password.value}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        consol.log(res)
        return res.json()
    })
});