# Pruebas de Integración — Documentación

## Endpoints y Casos Cubiertos

| # | Caso | Endpoint | Método | Datos de Prueba | Espera |
|---|-------|----------|--------|-----------------|--------|
| 1 | Registro completo | /api/auth/register | POST | email, password, nombre, apellido, edad, telefono, correo | 201 + token, usuario, perfil |
| 2 | Login correcto | /api/auth/login | POST | email, password correctos | 200 + token |
| 2b | Login incorrecto | /api/auth/login | POST | email correcto, password incorrecto | 401 |
| 3 | Ruta protegida sin token | /api/perfil | GET | — | 401 |
| 3b | Ruta protegida con token | /api/perfil | GET | token válido | 200 + datos perfil |
| 4 | Actualización perfil inválida | /api/perfil | PUT | edad fuera de rango | 400 |
| 4b | Actualización perfil válida | /api/perfil | PUT | datos válidos | 200 + perfil actualizado |

## Ejecución Automática

1. Instala dependencias de test:
   ```bash
   npm install --save-dev jest supertest
   ```
2. Agrega a tu package.json:
   ```json
   "scripts": {
     ...
     "test": "jest"
   }
   ```
3. Ejecuta las pruebas:
   ```bash
   npm test
   ```

## Notas
- Las pruebas limpian la base de datos antes de ejecutarse.
- Puedes modificar los datos de prueba según tus necesidades.
- Si usas otra base de datos para testing, ajusta la configuración en el archivo de test.

## Pruebas Manuales Angular
- Registro: redirige a /perfil si éxito
- Login: redirige a /perfil si éxito, error si credenciales incorrectas
- Logout: redirige a /login y borra token
- Token expirado: interceptor hace logout automático
- Actualización de perfil: muestra mensaje de éxito/error

---

Con esto tienes pruebas automáticas y guía para validación manual del flujo completo.