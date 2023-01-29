const btnSendMes = document.getElementById('submitMessage');

const socket = io('http://localhost:3000');

const divMessages = document.getElementById('messages');




// CHAT

btnSendMes.addEventListener('click', () => {
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

// JEU 

const questions = [
    { question: "Quel est l'animal qui a le plus de pattes?", answer: "Un escargot, il a huit pattes." },
    { question: "Quelles sont les deux choses qui n'ont pas de fin?", answer: "L'univers et la stupidité humaine." },
    { question: "Quelles sont les deux choses qui viennent toujours en paire?", answer: "Les jambes d'un fauteuil." }
    // Ajoutez autant de devinettes que vous le souhaitez
  ];
  
  function getRandomRiddle() {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  }
  
  const questions_display = document.getElementById("questions");
  const Subquestions = document.getElementById("rep");
  
  Subquestions.addEventListener("click", function() {

    const randomRiddle = getRandomRiddle();
    questions_display.value = randomRiddle.question;
    

  });

  // FORM

// const mongoose= require('mongoose')

// const schema = new mongoose.Schema({
//   pseudo: String,
//   password: String
// });


// const FormData = mongoose.model('FormData', schema);

// app.post('/submit', (req,res)=>{
//   const theDataForm = new FormData({
//     pseudo: req.body.pseudo,
//     password: req.body.password
//   });

//   theDataForm.save((err, theDataForm) => {
//     if (err) return console.error(err);
//     console.log('Form data saved to MongoDB:', theDataForm);
//     res.send('Form data saved to MongoDB');
//   });
// })

// 

// const buttonSignUp = document.querySelector('#submitSignUp');
// buttonSignUp.addEventListener('click', ()=>{
//     fetch("http://localhost:3000/",{
//         method:"POST",
//         headers:{
//             'Content-Type' : 'application/json'
//         },
//         body:JSON.stringify({
//             pseudo:'',
//             password:''
//         })
//     })
// })


const form = document.getElementById('signupForm');

form.addEventListener('submit', e => {
  e.preventDefault();

  const pseudo = document.getElementById('pseudo').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ pseudo, password })
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});
