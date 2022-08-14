const router = require('express').Router();
let Exercise = require('../models/excercise_model');

router.get('/', async (req, res) => {
    
    try{
    const  exercise = await Exercise.find()

    return res.json(exercise)
    }
    catch(err){
        return res.status(400).json('Error' + err)
    }
    
})


router.post('/add', async (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExcercise = new Exercise({
        username,
        description,
        duration,
        date
    })

    try{
    await newExcercise.save()
    return res.json('Exercise Added')
    }
    catch(err){
        res.status(400).json('Error' + err)
    }


})

router.get('/:id', async (req, res) => {
    Exercise.findById(req.params.id)
      .then(exercise => res.json(exercise))
      .catch(err => res.status(400).json('Error' + err))
})

router.delete('/:id', async (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('exercise deleted.'))
      .catch(err => res.status(400).json('Error' + err))
})

router.post('/update/:id', async (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);
        

        exercise.save()
        .then(() => res.json('Excercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error ' + err))
      
})

module.exports = router