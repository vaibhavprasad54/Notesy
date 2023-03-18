const jwt = require("jsonwebtoken");
const User = require("../models/userModels")
const asyncHandler = require("express-async-handler");

//This function is made to stop unauthorized access to the API.
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&                                                //Checking for authorization header
    req.headers.authorization.startsWith("Bearer")                              //Checking for token starting with bearer.
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //If the condition is true, then the app will find the user on the basis of ID leaving behind the password
      req.user = await User.findById(decoded.id).select("-password");

      next();                                   // This function will send the user to the API of Notes.

    } catch (error) {                           // Error block will execute in case the user could'nt be authorized.
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect }
