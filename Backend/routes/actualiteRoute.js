const express = require('express');
const router = express.Router();
const actualiteController = require('../controlleur/actualiteController');
const verifyToken = require('../middlewares/verifyToken'); // Middleware pour vérifier le token

// Route pour créer une actualité (protéger l'accès aux admins uniquement)
router.post('/',  actualiteController.createActualite);

// Route pour récupérer toutes les actualités (publique)
router.get('/', actualiteController.getAllActualites);

// Route pour récupérer une actualité par ID
router.get('/:id', actualiteController.getActualiteById);

// Route pour modifier une actualité (protéger l'accès aux admins uniquement)
router.put('/:id',  actualiteController.updateActualite);

// Route pour supprimer une actualité (protéger l'accès aux admins uniquement)
router.delete('/:id',  actualiteController.deleteActualite);

module.exports = router;
