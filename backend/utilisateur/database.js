// require('dotenv').config();
// const mongoose = require('mongoose');
// const { MongoClient } = require('mongodb');
// const client = new MongoClient(process.env.MONGO_URL);

// async function main(){
//     await client.connect();
//     console.log('CA SE CONNECTE')
//     const db = client.db('test') //création d'une database 'test'
//     const collection = db.collection('documents'); //on récupère les collections
//     const insertStuff = await collection.insertMany([{ a : 1},{ b : 2},{ c : 3}]) //apres avoir recup les collections on insere
//     console.log('documents insérés =>', insertStuff)
//     return 'slay';
// }

// main()
// .then(console.log)
// .catch(console.error)
// .finally(() => client.close());


// mongoose.connect()

const userSchema = new mongoose.Schema({
    email: String,
    pseudo: String,
    password: String
  });
  const User = mongoose.model('User', userSchema);

  const registerUser = (user, callback) => {
    const newUser = new User(user);
    newUser.save((error) => {
      if (error) {
        return callback(error);
      }
      return callback(null, newUser);
    });
  };

  app.post('/register', (req, res) => {
    registerUser(req.body, (error, user) => {
      if (error) {
        return res.status(400).json({error});
      }
      return res.json({user});
    });
  });