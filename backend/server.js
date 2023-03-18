// Importing Express
const express = require("express");
// const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

// Creating object of this imported package
const app = express();
dotenv.config();
connectDB();
app.use(express.json());                // Wrote this line to resolve error coming in Postman 


//Creating First Endpoint / API
// app.get("/", (req, res) => {
//     res.send("API is running...");
// })

//Fetching Notes
// app.get("/api/notes", (req, res) => {
//     res.json(notes);
// })

//Fetching Single note through id
    // app.get("/api/notes/:id", (req, res) => {
    //     const note = notes.find((n) => 
    //         n._id === req.params.id
    //     )
    //     res.send(note);
    // })


app.use('/api/users', userRoutes );                       //Initializing users route
app.use('/api/notes', noteRoutes );                       //Initializing notes route

app.use(notFound);
app.use(errorHandler);

// Creating web server
const PORT = process.env.PORT || 7000;
app.listen(5000, console.log(`Server started on port ${PORT}`));