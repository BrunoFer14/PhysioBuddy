// services/authService.js
const { V4 } = require('paseto');
require('dotenv').config();

const secretKey = Buffer.from(process.env.PASETO_SECRET_KEY, 'utf-8');

// Generate a PASETO token with user payload
async function generateToken(email) {
  const key = await V4.generateKey('public')
  const token = await V4.sign({ email }, key)
  return token;
}

// Verify a PASETO token
async function verifyToken(token) {
  return await V4.decrypt(token, secretKey, {
    audience: 'auth-service',
    issuer: 'auth-microservice',
  });
}

module.exports = { 
  generateToken, 
  verifyToken 
};
