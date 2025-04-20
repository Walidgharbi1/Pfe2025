// controllers/experienceController.js
const Experience = require('../models/Experience'); // Modèle Experience

// Récupérer toutes les expériences
exports.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer une nouvelle expérience
exports.createExperience = async (req, res) => {
  const experience = new Experience({
    company: req.body.company,
    position: req.body.position,
    duration: req.body.duration,
    // Ajoute d'autres champs ici si nécessaire
  });

  try {
    const newExperience = await experience.save();
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mettre à jour une expérience
exports.updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json(experience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une expérience
exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
