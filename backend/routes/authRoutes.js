const express = require('express');
const { registerValidator, loginValidator } = require('../utils/validators');
const { validationResult } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  authController.register(req, res, next);
});

router.post('/login', loginValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  authController.login(req, res, next);
});

module.exports = router;
