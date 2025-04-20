const express = require('express');
const router = express.Router();
const adminController = require('../controlleur/adminController');
const verifyToken = require('../middlewares/verifyToken');

// Connexion : reste publique
router.post('/loginAdmin', adminController.loginAdmin);

// Exemple : route protégée
router.get('/AdminDashboard', verifyToken(['admin']), (req, res) => {
  res.json({ message: "Bienvenue admin !", user: req.user });
});

module.exports = router;
