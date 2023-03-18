//Custom Error msg in case the URL is not found!
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl} `);
    res.status(404);
    next(error);
};

//This one is for general error, it takes the errors and convert them into structured form.
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
     message: err.message,
     stack: process.env.NODE_ENV === "production" ? null : err.stack,
   });
}; 

module.exports = { notFound, errorHandler };


// This file contains the functions required to display custom errors when the user hits the API.