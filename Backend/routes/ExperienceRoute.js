// routes/experienceRoutes.js
const express = require('express');
const router = express.Router();
const experienceController = require('../controlleur/experienceController');

// Routes pour gérer les expériences
router.get('/', experienceController.getAllExperiences);  // Récupérer toutes les expériences
router.post('/', experienceController.createExperience); // Créer une nouvelle expérience
router.put('/:id', experienceController.updateExperience); // Mettre à jour une expérience
router.delete('/:id', experienceController.deleteExperience); // Supprimer une expérience

module.exports = router;
