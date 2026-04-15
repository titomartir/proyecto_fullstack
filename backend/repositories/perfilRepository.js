// Repositorio de perfiles: solo consultas SQL parametrizadas
const pool = require('../config/database');

module.exports = {
  async findByUsuarioId(usuario_id) {
    const result = await pool.query('SELECT * FROM perfiles WHERE usuario_id = $1', [usuario_id]);
    return result.rows[0];
  },
  async create(perfil) {
    const { usuario_id, nombre, edad, telefono } = perfil;
    const result = await pool.query(
      'INSERT INTO perfiles (usuario_id, nombre, edad, telefono) VALUES ($1, $2, $3, $4) RETURNING *',
      [usuario_id, nombre, edad, telefono]
    );
    return result.rows[0];
  },
  async update(usuario_id, datos) {
    const { nombre, edad, telefono } = datos;
    const result = await pool.query(
      'UPDATE perfiles SET nombre = $1, edad = $2, telefono = $3 WHERE usuario_id = $4 RETURNING *',
      [nombre, edad, telefono, usuario_id]
    );
    return result.rows[0];
  }
};
