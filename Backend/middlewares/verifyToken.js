const jwt = require('jsonwebtoken');

const verifyToken = (rolesAutorises = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // format "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "Accès refusé. Token manquant." });
    }

    try {
      const decoded = jwt.verify(token, 'jwtsecretkey');
      req.user = decoded;

      if (rolesAutorises.length > 0 && !rolesAutorises.includes(decoded.role)) {
        return res.status(403).json({ message: "Accès interdit. Rôle insuffisant." });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Token invalide." });
    }
  };
};

module.exports = verifyToken;
