//Importing Mongoose
const mongoose = require("mongoose");

//Importing bcryptjs for encrypting passwords.
const bcrypt = require("bcryptjs");

//User Schema
const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
      pic: {
        type: String,
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    },
    {
      timestamps: true,
    }
  );


//Encrypting Password
  userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
      next();
    }
    //If password is not modified, then we will generate a unique salt using decryptJS
    const salt = await bcrypt.genSalt(10);           // Here, we are creating our salt which we will add in the password to decrypt
    this.password = await bcrypt.hash(this.password, salt);              //Here, we are adding the salt to the password to decrypt it.

  })

//Decrypting Password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

  const User = mongoose.model('User', userSchema);

  module.exports = User;


  // In this file till now we have created userSchema to accept data from the user in a certain way and also created two functions to 
  // decrypt and encrypt the passwords. 