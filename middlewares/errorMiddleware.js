const errorHandler = (err, req, res, next) => {
  console.log(err.stack); // Log the error for debugging purposes

  const statusCode = err.statusCode || 500; // Default to 500 for server errors
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;

