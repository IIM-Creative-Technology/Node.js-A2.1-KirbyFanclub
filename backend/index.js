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

///

app.post('/todos', async (req, res, next) => {
    const user = new User(req.body);
    const saveUser = await user.save();
    res.send(saveUser);
})

////mongodb

require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');
const { connectDatabase } = require('./src/services/mongoose');
const User = require('./src/models/user');


connectDatabase().catch(err => console.log(err));

// async function main(){
//     await mongoose.connect(process.env.MONGO_URL)

//     const User = mongoose.model('User', {
//         pseudo: {
//             type : String,
//             required : true,
//             validate (v){
//                 if (!validator.isLength(v,{ min:3, max:20})) throw new Error('Le pseudo doit être entre 3 et 20 caracteres');
//             }
//         },

//         password :{
//             type: String,
//             required : true,
//             validate (v){
//                 if (!validator.isLength(v,{ min:5, max:20})) throw new Error('Le mot de passe doit être entre 5 et 20 caracteres');
//             }
//         }
//     });

//     const firstPerson = new User({
//         pseudo:"kishi",
//         password:'alalajod'
//     })
//     const secondPerson = new User({
//         pseudo:"lyndab",
//         password:'azaaada'
//     })

//     const firstSave = await firstPerson.save();
//     const secondSave = await secondPerson.save();

//     console.log(firstSave,secondSave)
// }

