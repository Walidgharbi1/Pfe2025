// controllers/competenceController.js
const Competence = require('../models/Competence'); // Modèle Competence

// Récupérer toutes les compétences
exports.getAllCompetences = async (req, res) => {
  try {
    const competences = await Competence.find();
    res.status(200).json(competences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Créer une nouvelle compétence
exports.createCompetence = async (req, res) => {
  const competence = new Competence({
    name: req.body.name,
    level: req.body.level,  // Par exemple: "Débutant", "Intermédiaire", "Avancé"
    // Ajoute d'autres champs si nécessaire
  });

  try {
    const newCompetence = await competence.save();
    res.status(201).json(newCompetence);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Mettre à jour une compétence
exports.updateCompetence = async (req, res) => {
  try {
    const competence = await Competence.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!competence) {
      return res.status(404).json({ message: "Competence not found" });
    }
    res.status(200).json(competence);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une compétence
exports.deleteCompetence = async (req, res) => {
  try {
    const competence = await Competence.findByIdAndDelete(req.params.id);
    if (!competence) {
      return res.status(404).json({ message: "Competence not found" });
    }
    res.status(200).json({ message: "Competence deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
