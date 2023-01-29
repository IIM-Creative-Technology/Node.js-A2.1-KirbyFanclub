const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Server} = require('socket.io');
import mongoose, { Schema } from 'mongoose'
mongoose.set('strictQuery', true)
mongoose.connect("mongodb://127.0.0.1:27017/test");

const userSchema = {
  pseudo: String,
  mail: String,
  password: String,
}

const User = mongoose.model('User' , userSchema)

const app = express();
app.use(bodyParser.json())
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})


const router = express.Router()
// ------ routes ------
// user

// Creer un nouveau utilisateur
app.post('/', (req,res) => {
    const user = new User()
    user.pseudo = req.body.pseudo
    user.mail = req.body.email
    user.password = req.body.password
    user.save()
    res.send(user)
    res.json({
        pseudo: req.body.pseudo,
        password: req.body.password,
        email: req.body.email
    }) 
})

let loged = 0
// Login avec pseudo + mdp dans l'url
app.get('/api/:pseudo/:password', (req,res) => {
    User.find({ name:req.params.name ,password:req.params.password}).then(function(users){
        res.send(users);
    })
})

// inscription 
app.post('/api/user/signup', (req, res) => {
    User.find({ pseudo:req.params.name ,password:req.params.password}).then(function(users){
        res.send(users);
    })
    console.log(req.body)
    res.json(req.body)
})


// login
app.post('/api/user/login', (req, res) => {
    User.find({ pseudo:req.body.nameSignUp ,password:req.body.passwordSignUp}).then(function(users){
        loged = 1
        res.send(users);
      })
})

// déconnexion
app.get('/api/user/logout', (req, res) => {
    res.json({connection:isConnected})
    loged = 0
})

// réinitialisation du mdp
app.post('/api/user/forget', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

// suppression du user
app.delete('/api/user', (req, res) => {
    console.log(req.body.id)
  isConnected = 1
  User.findOneAndDelete({_id:req.body.id}).then(function (){
    res.json({
      msg: 'Got a DELETE request at /',
      connection: isConnected
    })
  })
})