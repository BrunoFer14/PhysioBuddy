require('dotenv').config();
const express = require('express');
const authController = require('./controllers/authController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//creating our custom async Error handling function 
// function asyncErrorHandle(fn) {
//   return (req,res,next) => {
//     routeFunction(req, res, next).catch(next);
//   };
// }

// Routes
app.post('/auth/register', authController.register);
app.post('/auth/login', authController.login);
app.get('/auth/verify', authController.verifyToken);

// app.use(errorHandlingMiddleware)

// function errorHandlingMiddleware(err,req,res,next){
//   console.log('Error Encountered: ',err)
// }

// Start the server
app.listen(PORT, () => {
  console.log(`Auth microservice running on http://localhost:${PORT}`);
});