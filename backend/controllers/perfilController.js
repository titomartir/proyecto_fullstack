// Controlador de perfil
const perfilService = require('../services/perfilService');

module.exports = {
  async obtenerPerfil(req, res, next) {
    try {
      const usuario_id = req.user.id;
      const perfil = await perfilService.obtenerPerfil(usuario_id);
      res.json(perfil);
    } catch (err) {
      next(err);
    }
  },
  async actualizarPerfil(req, res, next) {
    try {
      const usuario_id = req.user.id;
      const datos = req.body;
      const perfil = await perfilService.actualizarPerfil(usuario_id, datos);
      res.json(perfil);
    } catch (err) {
      next(err);
    }
  }
};
