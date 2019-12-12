const express = require('express');
const router = express.Router();
const db = require('../models');
const { User } = require('../models');
const { UserProfile } = require('../models');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

console.log("\n \n INSIDE Users \n \n");



router.post('/', (req, res) => {
    User.create(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


//get user by userID
router.get('/:userID', (req, res) => {
 // console.log("\n get user by userID \n  " + req.params.userID+ "   "+ req.params.username);
  User.findAll({where: {userID: req.params.userID} } )
  .then(user =>{ res.json(user);
    
  })
});


//get the user whos username matches :username
router.get('/username/:username', (req, res) => {
  
    console.log("\n username \n \n " + req.params.username+ "   "+ req.params.userID);
  
    User.findAll({where: {username: req.params.username} } )
    .then(user =>{ res.json(user);
      
    })
  });

//get the userprofile of the user whos username matches :username
router.get('/school/:username', (req, res) => {

  console.log("\n school \n ");
  UserProfile.findAll({
    include:[{
      model: User,
      where:{username: req.params.username}
    }]
    
    })
  .then(user =>{ res.json(user);
  })  
});




module.exports = router;