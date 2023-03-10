const express = require("express");
const User = require('../models/user');
const router = new express.Router();

router.post('/signup', async (req, res, next) => {
    const user = new User(req.body);

    try{
        const saveUser = await user.save();
        res.status(201).send(saveUser);
    }catch(e){
        res.status(400).send(e);
    }
})

router.get('/users/:id', async(req,res,next) =>{
    const userId = req.params.id;

    try{
        const user = await User.findById(userId)
        if(!user) return res.status(404).send('User not found')
        res.send(user)
    }catch(e){
        res.status(500).send(e);
    }
})

// router.patch('/users/:id', async(req,res,next) =>{
//     const userId = req.params.id;

//     try{
//         const user = await User.findByIdAndUpdate(userId, req.body,{
//             new:true,
//             runValidators:true
//         });

//         if(!user) return res.status(404).send('User not found')
//         res.send(user)
//     }catch(e){
//         res.status(500).send(e);
//     }
// })

router.delete('/users/:id', async(req,res,next) =>{
    const userId = req.params.id;

    try{
        const user = await User.findByIdAndDelete(userId);
        
        if(!user) return res.status(404).send('User not found')
        res.send(user)
    }catch(e){
        res.status(500).send(e);
    }
})
module.exports = router