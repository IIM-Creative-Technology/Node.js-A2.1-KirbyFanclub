const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
/* require('dotenv').config();
const client = new MongoClient(process.env.MONGO_URL); */
const {Server} = require('socket.io')

const app = express();
const port = 3000;

app.use(bodyParser.json())


import userRt from "./routes/user.js"

app.use("/api/user", userRt);

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

const userSchema = {
    pseudo: String,
    mail: String,
    password: String,
    isAdmin: Boolean,
    isVerified: Boolean,
  }

  const Sara = new User ({
    name: "Sara",
    mail: "hsaradel@gmail.com",
    password: "aaaassd",
    isAdmin: true,
    isVerified: true,
  })

const User =  mongoose.model('User', userSchema)
/* async function main(){
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
 */
const server = http.createServer(app)


// middlewares
app.use(express.json())
app.use(cors())

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


httpServer.listen(port, () => {
    console.log(`tout est ok, on écoute sur le port ${port}`)
})