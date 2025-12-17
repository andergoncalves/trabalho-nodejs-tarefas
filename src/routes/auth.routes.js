const express = require('express');
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// Login
router.post('/login', AuthController.login);

// Register
router.post('/register', AuthController.register);

// Dados do usuário logado
router.get('/me', authMiddleware, AuthController.me);

module.exports = router;