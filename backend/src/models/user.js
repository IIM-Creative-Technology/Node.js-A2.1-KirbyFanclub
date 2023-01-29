const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    pseudo: {
        type : String,
        required : true,
        validate (v){
            if (!validator.isLength(v,{ min:3, max:20})) throw new Error('Le pseudo doit être entre 3 et 20 caracteres');
        }
    },

    password :{
        type: String,
        required : true,
        validate (v){
            if (!validator.isLength(v,{ min:5, max:20})) throw new Error('Le mot de passe doit être entre 5 et 20 caracteres');
        }
    }
});

module.exports = User;