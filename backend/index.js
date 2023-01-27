const express = require('express');
const cors = require('cors');
const cors = require('cors');
const http = require('http');
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


const app = express();
const port = 3000;

const server = http.createServer(app)

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



server.listen(port, () => {
    console.log(`tout est ok, on écoute sur le port ${port}`)
})