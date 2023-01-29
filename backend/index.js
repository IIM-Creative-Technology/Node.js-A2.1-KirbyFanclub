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
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URL);



async function main(){
    await client.connect();
    console.log('CA SE CONNECTE')
    const db = client.db('test') //création d'une database 'test'
    const collection = db.collection('allo'); //on récupère les collections
    const insertStuff = await collection.insertMany([{ a : 1},{ b : 2},{ c : 3}]) //apres avoir recup les collections on insere
    console.log('documents insérés =>', insertStuff)
    return 'slay';
}

main()
.then(console.log)
.catch(console.error)
.finally(() => client.close());
