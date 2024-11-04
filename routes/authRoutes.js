const express = require('express')
const authController = require('../controllers/authController')
const validateUser = require('../middlewares/validationMiddleware')
const router = express.Router();

router.post('/register', validateUser, authController.register);
router.post('/login', authController.login);
router.get('/verify', authController.verifyToken);

module.exports = router;