const Offre = require('../models/Offre');

// Créer une nouvelle offre
exports.createOffre = async (req, res) => {
  try {
    const { titre, description, dateExpiration, specialite, salaire,type } = req.body;

    const nouvelleOffre = new Offre({
      titre,
      description,
      dateExpiration,
      specialite,
      salaire,
      type

    });

    await nouvelleOffre.save();
    res.status(201).json(nouvelleOffre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Récupérer toutes les offres
exports.getAllOffres = async (req, res) => {
  try {
    const offres = await Offre.find();
    res.status(200).json(offres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer une offre par son ID
exports.getOffreById = async (req, res) => {
  try {
    const offre = await Offre.findById(req.params.id);

    if (!offre) return res.status(404).json({ message: 'Offre non trouvée' });

    res.status(200).json(offre);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier une offre
exports.updateOffre = async (req, res) => {
  try {
    const offre = await Offre.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!offre) return res.status(404).json({ message: 'Offre non trouvée' });

    res.status(200).json(offre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer une offre
exports.deleteOffre = async (req, res) => {
  try {
    const offre = await Offre.findByIdAndDelete(req.params.id);

    if (!offre) return res.status(404).json({ message: 'Offre non trouvée' });

    res.status(200).json({ message: 'Offre supprimée avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
