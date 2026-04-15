const express = require('express');
const { perfilUpdateValidator } = require('../utils/validators');
const { validationResult } = require('express-validator');
const perfilController = require('../controllers/perfilController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, perfilController.obtenerPerfil);

router.put('/', authMiddleware, perfilUpdateValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  perfilController.actualizarPerfil(req, res, next);
});

module.exports = router;
