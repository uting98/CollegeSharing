const express = require('express');
const router = express.Router();


// Load each controller
const postsController = require('./posts.js');
const appConfigController = require('./appConfig.js');
const postProductController = require('./products.js');
const signUpController = require('./authentication/signup.js');
const loginController = require('./authentication/login.js');
const userController = require('./users.js');
const transactionController = require('./transactions.js');
const chatController = require('./chat.js');


// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/posts', postsController);
router.use('/application-configuration', appConfigController);
router.use('/products', postProductController);
router.use('/signup', signUpController);
router.use('/signin', loginController);
router.use('/users', userController);
router.use('/transactions', transactionController);
router.use('/chat', chatController);


module.exports = router;