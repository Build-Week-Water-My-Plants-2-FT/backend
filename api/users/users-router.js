const router = require('express').Router();
const bcrypt = require('bcryptjs')
const Users = require('./users-model.js');
const Plants = require('../plants/plants-model.js');

router.get('/', (req, res) => {
  Users.find()
    .then(list => res.status(200).json(list))
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'An Error occurred when attempting to retrieve users'})
    })
})

router.get('/:id', validateID, (req, res) => {
  Users.findByID(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => {
      console.log(err);
      res.status(500).json({message: `An Error occurred when retrieving info for User ${req.params.id}`});
    });
});

router.get('/:id/plants', validateID, (req, res) => {
  Users.findPlantsByUserID(req.params.id)
    .then(plants => res.status(200).json(plants))
    .catch(err => {
      console.log(err);
      res.status(500).json({message: `An Error occurred when retrieving info for User ${req.params.id}`});
    });
});

router.post('/:id/plants', validateID, validatePlant, (req, res) => {
  // const plant = {...req.body, user_id: req.params.id}
  const plant = { 
    user_id: req.params.id,
    nickname: req.body.nickname,
    species: req.body.species,
    h2o_frequency: req.body.h2o_frequency,
    img_url: req.body.img_url
  }
  Plants.add(plant)
    .then(added => res.status(201).json(added))
    .catch(err => {
      console.log(err)
      res.status(500).json({message: 'An Error occurred when attempting to add Plant'})
    })
})

router.put('/:id', validateID, (req, res) => {
  if (!req.body.password) {
    Users.update(req.params.id, req.body)
      .then(updated => res.status(200).json(updated))
      .catch(err => {
        console.log(err);
        res.status(500).json({message: `An Error occurred when attempting to Update User ${req.params.id}`});
      });
  } else {
    const rounds = process.env.HASH_ROUNDS || 12;
    const newHash = bcrypt.hashSync(req.body.password, rounds)
    const newInfo = {
      username: req.body.username,
      password: newHash,
      phone_number: req.body.phone_number
    }
    Users.update(req.params.id, newInfo)
      .then(updated => res.status(200).json(updated))
      .catch(err => {
        console.log(err);
        res.status(500).json({message: `An Error occurred when attempting to Update User ${req.params.id}`});
      });
  }
});

router.delete('/:id', validateID, (req, res) => {
  Users.remove(req.params.id)
    .then(() => res.status(200).json({message: `User with ID ${req.params.id} has been deleted`}))
    .catch(err => {
      console.log(err);
      res.status(500).json({message: `An Error occurred when attempting to Delete User ${req.params.id}`});
    });
});

// MIDDLEWARE

function validateID (req, res, next){
  Users.findByID(req.params.id)
    .then(user => {
      if (!user) {
        res.status(400).json({message: 'User ID Invalid'});
      } else {
        next();
      }
    });
}

function validatePlant (req, res, next){
  if(Object.keys(req.body).length === 0){
    res.status(401).json({message: 'No Plant Data provided'});
  } else if(!req.body.nickname || !req.body.species || !req.body.h2o_frequency){
    res.status(401).json({message: 'Nickname, Species, and H20 Frequency are required.'});
  } else {
    next();
  }
}

module.exports = router