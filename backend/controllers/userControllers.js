const asyncHandler = require('express-async-handler');
const User = require('../models/userModels');
const generateToken = require('../utils/generateToken');

//Function to register
const registerUser = asyncHandler(async (req,res) => {
    const { name, email, password, pic } = req.body;

    //Checking if the user exists in the database
    const userExists = await User.findOne({email});

    if(userExists) {
        res.status(400);
        throw new Error('User Already Exists');
    }

    //Creating New User
    const user = await User.create({
        name,
        email,
        password,
        pic
    })

    //If created successfully
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } 
    else {
        res.status(400);
        throw new Error("Error Occured!");
    }

});

//Function to login
const authUser = asyncHandler(async (req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});    //Filtering user through email

    if(user && (await user.matchPassword(password)) ) {             //If the user exists and the enetered password is correct
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id)                         // Generating JSON WEB TOKEN ( Last step )
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid email or Password!");
    }

});

// Function to update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;               // Updating Name
      user.email = req.body.email || user.email;
      user.pic = req.body.pic || user.pic;
      if (req.body.password) {                              //  Checking password and updating it.
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();                // Saving the updated user.
  
      res.json({                                            // Sending the details to backend
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        pic: updatedUser.pic,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  });

module.exports = { registerUser, authUser, updateUserProfile };                    //Exporting the functions


// This file contains the functions to register the user and if the user is registered then allow the user to login.
// For the same purpose, two functions are created respectfully.
// Then these functions are exportd to 'server.js' file to envoke using 'app.use' method.