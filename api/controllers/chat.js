const express = require("express");
const router = express.Router();

const Sequelize = require("sequelize");
const { Chat } = require('../models');
const op = Sequelize.Op;
const { tokenAuthentiation } = require("./user");


router.post("/", async (req, res) => {
  console.log("POST body: ", req.body);
  req.body.buyerID = await tokenAuthentiation(req.headers.authorization);
  console.log(req.body.buyerID);
  const { sellerID, buyerID } = req.body;
  Chat.findOrCreate({
    where: {
      [op.or]: [
        { user1: buyerID, user2: sellerID },
        { user1: sellerID, user2: buyerID }
      ]
    }
  })
    .then(chat => {
        console.log({newRecord: chat[0].newRecord});
      res.status(200).json({newRecord: chat[0].isNewRecord, value:chat[0].dataValues});
    })
    .catch(err => {
      res.status(400).json({ msg: "Failed to find or create chat", err });
    });
});

module.exports = router;
