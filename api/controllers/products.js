
const express = require('express');
const router = express.Router();
const db = require('../models');
const { Product } = require('../models');

const { UserProfile } = require('../models');
const { User } = require('../models');
const Sequelize = require('sequelize');
const op = Sequelize.Op;
const { tokenAuthentiation } = require('./user');
//import cookie from "react-cookies";


console.log("INSIDE PRODUCTS");

//get all products
router.get('/', async (req,res) => {
  try{
    // req.userID = await tokenAuthentiation(req.headers.authorization);
    Product.findAll({})
    .then(prods =>{ res.json(prods);
      
    //console.log("INSIDE GET REQ   "+prods);
    })
  }catch(err){
    res.status(500).json({"message": err.message});
  }

});

//post product
router.post('/', async (req,res) => {
  console.log("POST body: ", req.body);
  req.body.sellerID = await tokenAuthentiation(req.headers.authorization);
  const {productName, price, amount, description, sellerID, category, imageURL} = req.body;
  Product.create({
    productName, 
    price, 
    amount, 
    description, 
    sellerID, 
    category,
    imageURL,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(400).json({ msg: 'Failed to submit product', err });
    });
})

//find all products at user's school where the product name contains the param
router.get('/search/:school/:productName',(req, res) => {
  console.log(req.params.productName+" "+req.params.school);

  Product.findAll({
    
    where: { productName:{ [op.iLike] :'%'+req.params.productName+'%'}},
    include: [{
      model: User,
      where:{userID: {[op.gt]:0}},
      include:[{
        model:UserProfile,
        where:{[op.and]: [{school:req.params.school}]}
      }]
  }],
  order: [
    ['productID','ASC']
  ]
     
  })

  .then(prod => {
    if(!prod) {
      return res.sendStatus(404);
    }

    res.json(prod);
  });

});



  // Find all products where the user's school matches the param 
router.get('/school/:school', (req, res) => {

  console.log("\n GETTING PRODUCTS BY school \n \n ");
  Product.findAll({
    include: [{
      model: User,
      where:{userID: {[op.gt]:0}},
      include:[{
        model:UserProfile,
        where:{[op.and]: [{school:req.params.school}]}
      }]
  }],
  order: [
    ['productID','ASC']
  ]
     
  },
  console.log("\n found"))   .then(prod => {
    if(!prod ){

      return res.sendStatus(404);
    }

    res.json(prod);
  });

});



//find all products for a certian category at the user's school 
router.get('/category/:school/:category',(req, res) => {
  Product.findAll({
    
    where: { category: req.params.category},
    include: [{
      model: User,
      where:{userID: {[op.gt]:0}},
      include:[{
        model:UserProfile,
        where:{[op.and]: [{school:req.params.school}]}
      }]
  }],
  order: [
    ['productID','ASC']
  ]
     
  })

  .then(prod => {
    if(!prod) {
      return res.sendStatus(404);
    }

    res.json(prod);
  });

});


//find all products sold by a user
router.get('/u/:sellerID',(req, res) => {
  Product.findAll({where: { sellerID: req.params.sellerID} })
    .then(prod => {
      if(!prod) {
        return res.sendStatus(404);
      }

      res.json(prod);
    });
});

//set the amount for the corresponding product to the remaining parameter
router.put('/amount/:productID/:remaining', (req, res) => {
  console.log("\n \n INSIDE PUT \n\n");
  const { id } = req.params;
  console.log("amount is " + req.params.amount + "  "+ req.params.productID + "  " + req.body.quant + "  "+ req.body.toString()+"  "+req.body[0]+"  ")
  Product.update({
    amount: req.params.remaining,
  }, {
    where: {
      productID: req.params.productID
    }
  })
  .then(prod => {
    if(!prod) {
      return res.sendStatus(404);
    }

    res.json(prod);
  });

});



module.exports = router;