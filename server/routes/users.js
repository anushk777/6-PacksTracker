const router = require('express').Router();
let User = require('../models/user_model');

router.get('/', async (req, res) => {
    
    try{
    const user = await User.find()

    return res.json(user)
    }
    catch(err){
        return res.status(400).json('Error ' + err)
    }
    
})


router.post('/add', async (req, res) => {
    const username = req.body.username;

    const newUser = new User({username})

    try{
    await newUser.save()
    return res.json('User Added')
    }
    catch(err){
        res.status(400).json('Error' + err)
    }


})

module.exports = router