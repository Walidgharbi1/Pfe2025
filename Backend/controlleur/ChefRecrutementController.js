const ChefRecrutement = require('../models/ChefRecrutement');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Créer un nouveau chef
exports.registerChef = async (req, res) => {
  try {
    const { nom, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const chef = new ChefRecrutement({
      nom,
      email,
      password: hashedPassword
    });

    await chef.save();
    res.status(201).json(chef);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Connexion
exports.loginChef = async (req, res) => {
  const { email, password } = req.body;

  try {
    const chef = await ChefRecrutement.findOne({ email });

    if (!chef) return res.status(404).json({ message: 'Chef non trouvé' });

    const valid = await bcrypt.compare(password, chef.password);
    if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: chef._id, role: 'chef' }, 'jwtsecretkey', { expiresIn: '1d' });

    res.json({
      token,
      user: {
        id: chef._id,
        nom: chef.nom,
        email: chef.email,
        role: 'recruteur'
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Récupérer tous les chefs
exports.getAll = async (req, res) => {
  try {
    const chefs = await ChefRecrutement.find();
    res.json(chefs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un chef
exports.deleteChef = async (req, res) => {
  try {
    await ChefRecrutement.findByIdAndDelete(req.params.id);
    res.json({ message: "Chef supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
