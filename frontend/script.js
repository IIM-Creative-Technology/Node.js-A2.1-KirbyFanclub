const socket = io('http://localhost:3000/')
const inputvalue = document.getElementById('insertmsg').value
const button = document.getElementById('button')
const data1 = document.getElementById('show')





button.addEventListener('click', () => {
    socket.emit('message', {msg : `${inputvalue}`})

})

socket.on('sendFront', (data) =>{

    const li = document.createElement('li');
    li.innerHTML = data.msg
    data1.appendChild(li)
    console.log(data1.appendChild(li))

}) 