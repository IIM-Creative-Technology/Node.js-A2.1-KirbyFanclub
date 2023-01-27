const express = require('express');
const cors = require('cors');
const http = require('http');

const {Server} = require('socket.io')

const app = express();
const port = 3000;


const httpServer = http.createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

io.on('connection', (socket) => {
    console.log(socket.id)
    socket.on('message', (data) => {
        console.log(data)
        io.emit('sendFront', data)
    })
})


// middlewares
app.use(express.json())
app.use(cors())


// ------ routes ------
// user
app.get('/api/user', (req, res) => {
    console.log(req.params)
    res.json('{msg: info user}')
})

// inscription 
app.post('/api/user/signup', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

// login
app.post('/api/user/login', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

// déconnexion
app.get('/api/user/logout', (req, res) => {
    console.log(req.params)
    res.json('{msg: deconnexion du user}')
})

// réinitialisation du mdp
app.post('/api/user/forget', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

// suppression du user
app.delete('/api/user', (req, res) => {
    res.send('user a été supprimé')
})

// app.delete('/api/user/:id', (req, res) => {
//     const userId = req.params.id;
//     Resource.findByIdAndRemove(userId, (err, resource) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.send(`L'utilisateur ${userId} a été supprimé`);
//         }
//     });
// });
// Resource correspond à un modèle Mongoose prédéfinit auparavant


// chat
app.get('/api/chat/messages', (req, res) => {
    console.log(req.params)
    res.json('{msg: recuperation de tous les messages}')
})

app.get('/api/chat/:id', (req, res) => {
    console.log(req.params)
    res.json('{msg: recuperation des messages du user}')
})

// créer un message
app.post('/api/chat/messages', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

// supprimer un message
app.delete('/api/chat/messages/:id', (req, res) => {
    res.send('Le message a été supprimé')
})

// app.delete('/api/chat/messages/:id', (req, res) => {
//     const messageId = req.params.id;
//     Resource.findByIdAndRemove(messageId, (err, resource) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.send(`Le message ${messageId} a été supprimé`);
//         }
//     });
// });



httpServer.listen(port, () => {
    console.log(`tout est ok, on écoute sur le port ${port}`)
})