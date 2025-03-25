const errorHandler = (err, req, res, next) => {
    // Default to 500 Internal Server Error if status code is 200
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    // Default error message
    let message = err.message || "Internal Server Error";

    // Handle Mongoose validation errors
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(", ");
    }

    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
        statusCode = 400;
        message = "Duplicate field value entered";
    }

    // Handle CastError (invalid ObjectId)
    if (err.name === "CastError") {
        statusCode = 400;
        message = `Resource not found with ID: ${err.value}`;
    }

    // Log error for debugging (only in development mode)
    if (process.env.NODE_ENV === "development") {
        console.error(`[ERROR] ${err.name}: ${message}`);
    }

    // Send JSON response with error details
    res.status(statusCode).json({
        success: false,
        error: message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined // Show stack trace in dev mode
    });
};

module.exports = errorHandler;
