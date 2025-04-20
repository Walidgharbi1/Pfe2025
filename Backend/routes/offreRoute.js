const express = require('express');
const router = express.Router();
const offreController = require('../controlleur/offreController');
const verifyToken = require('../middlewares/verifyToken'); // Middleware JWT

// Route pour créer une offre (protéger l'accès aux admins uniquement)
router.post('/', verifyToken(['admin']), offreController.createOffre);

// Route pour récupérer toutes les offres (publique ou protégée)
router.get('/', offreController.getAllOffres);

// Route pour récupérer une offre par ID (publique ou protégée)
router.get('/:id', offreController.getOffreById);

// Route pour modifier une offre (protéger l'accès aux admins uniquement)
router.put('/:id', verifyToken(['admin']), offreController.updateOffre);

// Route pour supprimer une offre (protéger l'accès aux admins uniquement)
router.delete('/:id', verifyToken(['admin']), offreController.deleteOffre);

module.exports = router;
