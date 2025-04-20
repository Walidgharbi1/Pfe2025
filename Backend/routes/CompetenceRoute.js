// routes/competenceRoutes.js
const express = require('express');
const router = express.Router();
const competenceController = require('../controlleur/competenceController');

// Routes pour gérer les compétences
router.get('/', competenceController.getAllCompetences);  // Récupérer toutes les compétences
router.post('/', competenceController.createCompetence); // Créer une nouvelle compétence
router.put('/:id', competenceController.updateCompetence); // Mettre à jour une compétence
router.delete('/:id', competenceController.deleteCompetence); // Supprimer une compétence

module.exports = router;
