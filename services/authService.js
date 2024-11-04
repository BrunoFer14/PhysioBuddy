// services/authService.js
const { V3 } = require('paseto');
require('dotenv').config();

const secretKey = Buffer.from(process.env.PASETO_SECRET_KEY, 'utf-8');

// Generate a PASETO token with user payload
async function generateToken(payload) {
  return await V3.encrypt(payload, secretKey, {
    audience: 'auth-service',
    issuer: 'auth-microservice',
    expiresIn: '1h',
  });
}

// Verify a PASETO token
async function verifyToken(token) {
  return await V3.decrypt(token, secretKey, {
    audience: 'auth-service',
    issuer: 'auth-microservice',
  });
}

module.exports = { 
  generateToken, 
  verifyToken 
};
