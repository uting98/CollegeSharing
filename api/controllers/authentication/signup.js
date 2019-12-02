const express = require('express');
const router = express.Router();
const { signUpAccount } = require('../auth');

router.post('/', async (req,res) => {
  try {
    const { email, username, password, firstName, lastName, school } = req.body;
    console.log("Extra Body")
    const response = await signUpAccount({ email, username, password, firstName, lastName, school });
    console.log("Finish sign up account")
    console.log(response)
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ "error" : err.message });
  }
})
module.exports = router;