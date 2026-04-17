// Repositorio de perfiles: solo consultas SQL parametrizadas
const pool = require('../config/database');

module.exports = {
  async findByUsuarioId(usuario_id) {
    const result = await pool.query('SELECT * FROM perfiles WHERE usuario_id = $1', [usuario_id]);
    return result.rows[0];
  },
  async create(perfil) {
    const { usuario_id, nombre, apellido, edad, telefono, correo } = perfil;
    const result = await pool.query(
      'INSERT INTO perfiles (usuario_id, nombre, apellido, edad, telefono, correo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [usuario_id, nombre, apellido, edad, telefono, correo]
    );
    return result.rows[0];
  },
  async update(usuario_id, datos) {
    const { nombre, apellido, edad, telefono, correo } = datos;
    const result = await pool.query(
      'UPDATE perfiles SET nombre = $1, apellido = $2, edad = $3, telefono = $4, correo = $5 WHERE usuario_id = $6 RETURNING *',
      [nombre, apellido, edad, telefono, correo, usuario_id]
    );
    return result.rows[0];
  }
};
