const Actualite = require('../models/Actualite');

// Créer une nouvelle actualité
exports.createActualite = async (req, res) => {
  try {
    const { titre, description, contenu, dateExpiration } = req.body;

    const newActualite = new Actualite({
      titre,
      description,
      contenu,
      dateExpiration,
    });

    await newActualite.save();
    res.status(201).json(newActualite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Récupérer toutes les actualités
exports.getAllActualites = async (req, res) => {
  try {
    const actualites = await Actualite.find();
    res.status(200).json(actualites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer une actualité par ID
exports.getActualiteById = async (req, res) => {
  try {
    const actualite = await Actualite.findById(req.params.id);
    if (!actualite) {
      return res.status(404).json({ message: 'Actualité non trouvée' });
    }
    res.status(200).json(actualite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier une actualité
exports.updateActualite = async (req, res) => {
  try {
    const actualite = await Actualite.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualite) {
      return res.status(404).json({ message: 'Actualité non trouvée' });
    }
    res.status(200).json(actualite);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une actualité
exports.deleteActualite = async (req, res) => {
  try {
    const actualite = await Actualite.findByIdAndDelete(req.params.id);
    if (!actualite) {
      return res.status(404).json({ message: 'Actualité non trouvée' });
    }
    res.status(200).json({ message: 'Actualité supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
