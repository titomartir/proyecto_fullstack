// Middleware para manejo de errores
module.exports = function (err, req, res, next) {
  console.error(err);
  res.status(400).json({ error: err.message || 'Error inesperado' });
};
