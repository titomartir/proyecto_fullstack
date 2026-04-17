// Controlador de autenticación
const authService = require('../services/authService');

module.exports = {
  async register(req, res, next) {
    try {
      const { email, password, nombre, apellido, edad, telefono, correo } = req.body;
      const result = await authService.register({ email, password, nombre, apellido, edad, telefono, correo });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.login({ email, password });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
};
