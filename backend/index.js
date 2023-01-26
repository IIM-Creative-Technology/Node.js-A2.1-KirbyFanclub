const express = require('express');
// Creation du Serveur
const app = express();
const {Server} = require('socket.io');
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin : "*",
    }
})

// Initialisation
app.use(express.json())
app.use(cors())

// Socket (requètes des messages)
io.on('connection', (socket) =>{
    socket.on('message', (data) =>{
        socket.emit('sendFront', data)
        console.log(data)
    })
})

