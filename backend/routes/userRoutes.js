// Importing express
const express = require('express');
const { registerUser, authUser, updateUserProfile } = require('../controllers/userControllers');
const { protect } = require('../middlewares/authMiddleware');

//Importing router from express
const router = express.Router();

//Creating an API Endpoint for Registration of user
router.route('/').post(registerUser)

//Creating an API Endpoint for Login
router.route('/login').post(authUser)       //This post request contains the function 'authUser' created on file 'userControllers'

//Creating an API Endpoint to update User Profile
router.route('/profile').post(protect , updateUserProfile);

module.exports = router;




// So, in this file, we create routes, which asks for 2 parameters, the first parameter contains the '/route' and 
// the second parameter contains the 'function' used to perform that task, these functions is created in 'userController' file.
