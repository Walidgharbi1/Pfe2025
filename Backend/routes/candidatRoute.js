const express = require('express');
const router = express.Router();
const candidatController = require('../controlleur/candidateControlleur');

// Routes CRUD
router.post('/ajouterCandidat', candidatController.ajouterCandidat);
router.post('/loginCandidat', candidatController.loginCandidat);
router.get('/getAllCandidat', candidatController.getAllCandidats);
router.get('/chercherParNom/:nom', candidatController.chercherParNom);
router.put('/modifierCandidate/:cin', candidatController.modifierCandidat);
router.delete('/supprimerCandidate/:id', candidatController.supprimerCandidat);



module.exports = router;
