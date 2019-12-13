const express = require("express");
const router = express.Router();

const Sequelize = require("sequelize");
const { Chat } = require('../models');
const op = Sequelize.Op;
const { tokenAuthentiation, findUserName } = require("./user");


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

router.get("/", async (req, res) => {
    console.log("POST body: ", req.body);
    const userID = await tokenAuthentiation(req.headers.authorization);
    console.log(userID);
    Chat.findAll({
      where: {
        [op.or]: [
          { user1: userID },
          { user2: userID }
        ]
      }
    })
      .then(async (chats) => {
          allFriend = [];
          const promises = chats.map(async (chat) => {
            console.log(chat)
            //   console.log("---- IN FILTER 1 ----")
            const friendID = chat.dataValues.user1 == userID ? chat.dataValues.user2 : chat.dataValues.user1;
            //   console.log("---- IN FILTER 2 ----")
            //   const friendName = await findUserName(friendID);
            console.log({userID: userID})
            console.log({chatUserId: chat.dataValues.user2})
            console.log(friendID)
            
            const friendName = await findUserName(friendID);

            console.log({chatID: chat.dataValues.chatID})
            Object.assign(chat.dataValues, {friendName})
            return chat
          })
          const friends = await Promise.all(promises);
          res.status(200).json(friends);
      })
      .catch(err => {
        res.status(400).json({ msg: "Failed to fetch the chat", err });
      });
  });

module.exports = router;
