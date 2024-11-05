// services/authService.js
const { V4 } = require('paseto');
require('dotenv').config();

// Generate a PASETO token with user payload
async function generateToken(email) {
  const key = await V4.generateKey('public')
  const token = await V4.sign({ email }, key)
  return token;
}

// Verify a PASETO token
async function verifyToken(token) {
    const payload = await V4.verify(token, publicKey, {
      audience: 'auth-service',
      issuer: 'auth-microservice',
    });
    return payload;  // Payload includes email and other claims if valid
}

module.exports = { 
  generateToken, 
  verifyToken 
};
