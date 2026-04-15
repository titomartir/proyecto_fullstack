// Pruebas de integración backend con Jest + Supertest
const request = require('supertest');
const app = require('../app');
const { Pool } = require('pg');

// Configuración de base de datos de test (ajusta si usas otra DB para pruebas)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

let token;
let perfilId;

beforeAll(async () => {
  // Limpia usuarios y perfiles antes de pruebas
  await pool.query('DELETE FROM perfiles');
  await pool.query('DELETE FROM usuarios');
});

describe('Pruebas de integración API', () => {
  test('1. Registro completo', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'test1@mail.com',
        password: '123456',
        nombre: 'Juan',
        apellido: 'Pérez',
        edad: 25,
        telefono: '12345678',
        correo: 'juan@mail.com'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
    perfilId = res.body.perfil.id;
  });

  test('2. Login correcto', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test1@mail.com', password: '123456' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('2b. Login incorrecto', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test1@mail.com', password: 'wrongpass' });
    expect(res.statusCode).toBe(401);
  });

  test('3. Rutas protegidas sin token', async () => {
    const res = await request(app).get('/api/perfil');
    expect(res.statusCode).toBe(401);
  });

  test('3b. Rutas protegidas con token', async () => {
    const res = await request(app)
      .get('/api/perfil')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe('Juan');
  });

  test('4. Actualización de perfil inválida', async () => {
    const res = await request(app)
      .put('/api/perfil')
      .set('Authorization', `Bearer ${token}`)
      .send({ edad: 10 }); // Edad fuera de rango
    expect(res.statusCode).toBe(400);
  });

  test('4b. Actualización de perfil válida', async () => {
    const res = await request(app)
      .put('/api/perfil')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nombre: 'Juanito',
        apellido: 'Pérez',
        edad: 30,
        correo: 'juanito@mail.com',
        telefono: '87654321'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.nombre).toBe('Juanito');
  });
});

// Limpieza final
afterAll(async () => {
  await pool.end();
});
