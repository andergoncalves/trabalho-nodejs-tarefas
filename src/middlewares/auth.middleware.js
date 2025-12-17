const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica se o header existe
  if (!authHeader) {
    return res.status(401).json({
      error: 'Token não informado'
    });
  }

  // Esperado: Bearer token
  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({
      error: 'Token mal formatado'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Injeta o usuário na requisição
    req.userId = decoded.id;

    return next();

  } catch (error) {
    return res.status(401).json({
      error: 'Token inválido ou expirado'
    });
  }
};