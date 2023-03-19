// Importing Express
const express = require("express");
// const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");

// Creating object of this imported package
dotenv.config();

connectDB();

const app = express();


app.use(express.json());                // Wrote this line to resolve error coming in Postman 


app.use('/api/users', userRoutes );                       //Initializing users route
app.use('/api/notes', noteRoutes );                       //Initializing notes route


// -----------Deployment---------------
__dirname = path.resolve();
if(process.env.NODE_ENV === "production"){              // If environment is "Production"
    app.use(express.static(path.join(__dirname, "/frontend/build")));                   //Connecting backend route with frontend "build" folder route.

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
    });

} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
      });
}


app.use(notFound);
app.use(errorHandler);



// Creating web server
const PORT = process.env.PORT || 7000;
app.listen(PORT, console.log(`${process.env.NODE_ENV} mode on port ${PORT}..`));