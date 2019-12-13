const express = require('express');
const router = express.Router();
const db = require('../models');
const { Transaction } = require('../models');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const { tokenAuthentiation, findUserName } = require('./user');


//console.log("\n \n INSIDE transactions.js \n \n");
router.get('/', (req,res) => {
    Transaction.findAll({where: {sellerID: {[op.lte]: 1}} } )
    .then(posts =>{ res.json(posts);
      
    })
});



router.get('/seller/:sellerID', (req, res) => {
  console.log("\n get transactions by sellerID \n " + req.params.sellerID);
  const { id } = req.params.sellerID;
  Transaction.findAll({where: {sellerID: req.params.sellerID} } )
  .then(posts =>{ res.json(posts);
    
  })
});

router.get('/buyer/:buyerID', (req, res) => {
  
    console.log("\n get transaction by buyerID \n " + req.params.buyerID);
    const { id } = req.params.buyerID;
    Transaction.findAll({where: {buyerID: req.params.buyerID} } )
    .then(posts =>{ res.json(posts);
      
    })
  });


  //post product
router.post('/', async (req,res) => {
  console.log("\n Transaction post body \n ", req.body);
  req.body.buyerID = await tokenAuthentiation(req.headers.authorization);
  const {sellerID, buyerID, productID, amount, price} = req.body;
  Transaction.create({
    sellerID, 
    buyerID, 
    productID, 
    price, 
    amount, 
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(400).json({ msg: 'Failed to submit transactions', err });
    });
})




router.put('/:id', (req, res) => {
  const { id } = req.params;
  Transaction.findByPk(id)
    .then(post => {
      if(!post) {
        return res.sendStatus(404);
      }

      post.content = req.body.content;
      post.save()
        .then(post => {
          res.json(post);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Transaction.findByPk(id)
    .then(post => {
      if(!post) {
        return res.sendStatus(404);
      }

      post.destroy();
      res.sendStatus(204);
    });
});




module.exports = router;