const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  // 1. El guardia mira si el usuario trae el pase en la mano (en los Headers)
  const authHeader = req.header('Authorization');

  // Si no trae nada, le niega el paso inmediatamente
  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó un token' });
  }

  // El token llega en formato "Bearer eyJhbGciOi...", así que extraemos solo el código
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Formato de token inválido.' });
  }

  try {
    // 2. El guardia pasa el token por el escáner matemático usando tu firma secreta
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    
    // 3. Si el escáner lo aprueba, guardamos los datos del usuario y abrimos la puerta (next)
    req.usuario = verificado;
    next(); // ¡Esta es la palabra mágica que le dice a Express que continúe a la ruta!
    
  } catch (error) {
    // Si el token es falso, fue modificado o ya expiró (pasó 1 hora)
    res.status(401).json({ mensaje: 'Token inválido o expirado.' });
  }
};

module.exports = verificarToken;