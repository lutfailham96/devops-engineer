const express = require('express');
const validator = require('../validations');
const authValidation = require('../validations/authValidation');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', validator.body(authValidation.registerSchema), authController.register);
router.post('/login', validator.body(authValidation.loginSchema), authController.login);

module.exports = router;
