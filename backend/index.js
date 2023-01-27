const express = require('express');
const cors = require('cors');
const http = require('http');

const {Server} = require('socket.io')

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

const cors= require('cors');