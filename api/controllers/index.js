const express = require('express');
const router = express.Router();


// Load each controller
const postsController = require('./posts.js');
const appConfigController = require('./appConfig.js');
const postProductController = require('./products.js');
const signUpController = require('./authentication/signup.js');
const loginController = require('./authentication/login.js');

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/posts', postsController);
router.use('/application-configuration', appConfigController);
router.use('/products', postProductController);
router.use('/signup', signUpController);
router.use('/signin', loginController);


module.exports = router;