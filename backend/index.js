// Creation du Serveur
const express = require('express');
const app = express();
const {Server} = require('socket.io');
const http = require('http');
const cors = require('cors');
const httpServer = http.createServer(app);
const port = 3000
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


// ecoute du port

httpServer.listen(port, () =>{
    console.log(`On écoute sur le port ${port}`)
})

