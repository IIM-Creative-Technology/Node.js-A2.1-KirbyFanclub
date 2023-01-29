// Creation du Serveur
const express = require('express');
const app = express();
const {Server} = require('socket.io');
const http = require('http');
const cors = require('cors');
// const { default: mongoose } = require('mongoose');
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
        io.emit('sendFront', data)
        console.log(data)
    })
})


// ecoute du port

httpServer.listen(port, () =>{
    console.log(`On écoute sur le port ${port}`)
})

////mongodb

require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const { connectDatabase } = require('./src/services/mongoose');
const User = require('./src/models/user');
const userRoutes = require('./src/routes/user')

app.use(userRoutes);


connectDatabase().catch(err => console.log(err));


