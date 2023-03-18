//Importing JWT
const jwt = require('jsonwebtoken')

//Generating token using JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",                               // Expires after 30 days
    })
}


module.exports = generateToken;                        // Exporting JWT
