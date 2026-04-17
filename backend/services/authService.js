// Servicio de autenticación: registro y login
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioRepo = require('../repositories/usuarioRepository');
const perfilRepo = require('../repositories/perfilRepository');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  async register({ email, password, nombre, apellido, edad, telefono, correo }) {
    // Verifica si el usuario ya existe
    const existente = await usuarioRepo.findByEmail(email);
    if (existente) throw new Error('El usuario ya existe');
    // Hashea la contraseña
    const password_hash = await bcrypt.hash(password, 10);
    // Crea el usuario
    const usuario = await usuarioRepo.create({ email, password_hash });
    // Crea el perfil asociado
    const perfil = await perfilRepo.create({ usuario_id: usuario.id, nombre, apellido, edad, telefono, correo });
    // Genera el token JWT
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });
    return { usuario, perfil, token };
  },
  async login({ email, password }) {
    const usuario = await usuarioRepo.findByEmail(email);
    if (!usuario) throw new Error('Credenciales inválidas');
    const match = await bcrypt.compare(password, usuario.password_hash);
    if (!match) throw new Error('Credenciales inválidas');
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '1h' });
    return { usuario, token };
  }
};
