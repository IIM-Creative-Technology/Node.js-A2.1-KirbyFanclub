const btnSendMes = document.getElementById('submitMessage');

const socket = io('http://localhost:3000');

const divMessages = document.getElementById('messages');

const questions = [
  { question: "Quel est l'animal qui a le plus de pattes?", answer: "Un escargot, il a huit pattes." },
  { question: "Quelles sont les deux choses qui n'ont pas de fin?", answer: "L'univers et la stupidité humaine." },
  { question: "Quelles sont les deux choses qui viennent toujours en paire?", answer: "Les jambes d'un fauteuil." }
  // Ajoutez autant de devinettes que vous le souhaitez
];

const random_questions = Math.floor(Math.random() * questions.length);


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


    function guessRiddle() {
      const guess = parseInt(document.getElementById("guess").value);

      if (guess === random_questions) {
        document.getElementById("result").innerHTML = "Félicitations, vous avez trouvé le bon nombre !";
      } else {
        document.getElementById("result").innerHTML = "Désolé, ce n'est pas la bonne réponse. Essayez encore.";
      }
    }

// QUESTIONS

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
const submitBt = document.getElementById('submitBt')
const submitSignUp = document.getElementById('submitSignUp')


// var value;
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