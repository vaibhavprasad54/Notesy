//Importing Mongoose
const mongoose = require('mongoose');

//Connecting MongoDB with Backend
const connectDB = async() => {
    try {
        mongoose.set("strictQuery", false);                      // Used this line to resolve error due to version change in MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true, 
            // useCreateIndex: true,
        });
        console.log(`MongoDB Connected Successfully!: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
}


module.exports = connectDB;