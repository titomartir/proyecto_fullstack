const { body } = require('express-validator');

exports.registerValidator = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Mínimo 6 caracteres'),
  body('nombre').notEmpty().withMessage('Nombre requerido'),
  body('apellido').notEmpty().withMessage('Apellido requerido'),
  body('edad').isInt({ min: 18, max: 120 }).withMessage('Edad entre 18 y 120'),
  body('telefono').matches(/^\d{8}$/).withMessage('Teléfono de 8 dígitos'),
  body('correo').isEmail().withMessage('Correo de perfil inválido')
];

exports.loginValidator = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Contraseña requerida')
];

exports.perfilUpdateValidator = [
  body('nombre').notEmpty().withMessage('Nombre requerido'),
  body('apellido').notEmpty().withMessage('Apellido requerido'),
  body('edad').isInt({ min: 18, max: 120 }).withMessage('Edad entre 18 y 120'),
  body('telefono').matches(/^\d{8}$/).withMessage('Teléfono de 8 dígitos'),
  body('correo').isEmail().withMessage('Correo de perfil inválido')
];
