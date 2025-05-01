const express = require('express');
const router = express.Router();
const offreController = require('../controlleur/offreController');
const verifyToken = require('../middlewares/verifyToken'); // Middleware JWT

// Route pour créer une offre (protéger l'accès aux admins uniquement)
router.post('/ajouterOffre', offreController.createOffre);

// Route pour récupérer toutes les offres (publique ou protégée)
router.get('/offres', offreController.getAllOffres);

// Route pour récupérer une offre par ID (publique ou protégée)
router.get('/offre/:id', offreController.getOffreById);

// Route pour modifier une offre (protéger l'accès aux admins uniquement)
router.put('/updateOffre/:id', offreController.updateOffre);

// Route pour supprimer une offre (protéger l'accès aux admins uniquement)
router.delete('/supprimerOffre/:id',  offreController.deleteOffre);

module.exports = router;
