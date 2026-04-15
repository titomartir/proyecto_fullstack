// Repositorio de usuarios: solo consultas SQL parametrizadas
const pool = require('../config/database');

module.exports = {
  async findByEmail(email) {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    return result.rows[0];
  },
  async create(usuario) {
    const { email, password_hash } = usuario;
    const result = await pool.query(
      'INSERT INTO usuarios (email, password_hash) VALUES ($1, $2) RETURNING *',
      [email, password_hash]
    );
    return result.rows[0];
  }
};
