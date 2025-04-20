const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Connexion Admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: 'Admin non trouvé' });
    }

    const validPassword = await bcrypt.compare(password, admin.motDePasse);
    if (!validPassword) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, 'jwtsecretkey', { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: admin._id,
        nom: admin.nom,
        email: admin.email,
        role: 'admin'
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
