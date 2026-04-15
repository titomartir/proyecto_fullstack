// Servicio de perfil: obtener y actualizar perfil con validaciones
const perfilRepo = require('../repositories/perfilRepository');


module.exports = {
  async obtenerPerfil(usuario_id) {
    return await perfilRepo.findByUsuarioId(usuario_id);
  },
  async actualizarPerfil(usuario_id, datos) {
    return await perfilRepo.update(usuario_id, datos);
  }
};
