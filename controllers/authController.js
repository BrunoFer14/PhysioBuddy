// controllers/authController.js
const bcrypt = require('bcryptjs');
const authService = require('../services/authService');
const db = require('../data/db'); // Import the raw SQL functions
const { V4 } = require('paseto');

// Register a new user
async function register(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email and password are required' });
  }

  // Check if the user already exists
  const existingUser = await db.findUser(email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Hash password and save user
  const passwordHash = await bcrypt.hash(password, 10);
  await db.createUser(username, email, passwordHash);
  res.status(201).json({ message: 'User registered successfully' });
}

// Login a user and generate a token
async function login(req, res) {
  const { email, password } = req.body;
  
  const user = await db.findUser(email);
  if (!user) {
    return res.status(401).json({ error: 'user not found' });
  }
  
  const isMatch = await bcrypt.compare(password, user.passwordhash);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid password' });
  }
  
  // Generate a token
  const token = await authService.generateToken(email);
  res.json({ token });
}

// Verify token validity
async function verifyToken(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = await authService.verifyToken(token);
    res.json({ valid: true, payload });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

module.exports = { register, login, verifyToken };
