const express = require('express');
const router = express.Router();
const testController = require('../controlleur/testController');
const verifyToken = require('../middlewares/verifyToken'); // Middleware JWT

// Route pour créer un test (protéger l'accès aux admins uniquement)
router.post('/', verifyToken(['admin']), testController.createTest);

// Route pour récupérer tous les tests (accessible publiquement ou à admin)
router.get('/', testController.getAllTests);

// Route pour récupérer un test spécifique par ID
router.get('/:id', testController.getTestById);

// Route pour modifier un test (protéger l'accès aux admins uniquement)
router.put('/:id', verifyToken(['admin']), testController.updateTest);

// Route pour supprimer un test (protéger l'accès aux admins uniquement)
router.delete('/:id', verifyToken(['admin']), testController.deleteTest);

module.exports = router;
