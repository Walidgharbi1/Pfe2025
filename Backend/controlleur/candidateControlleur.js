const Candidat = require('../models/Candidat');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Ajouter un candidat (inscription)
exports.ajouterCandidat = async (req, res) => {
  try {
    const { nom, email, password, telephone, adresse, cin, cv, competences, experiences } = req.body;

    // Vérification de l'email existant
    const existingCandidat = await Candidat.findOne({ email });
    if (existingCandidat) {
      return res.status(400).json({ message: 'Un candidat avec cet email existe déjà' });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création du candidat
    const candidat = new Candidat({
      nom,
      email,
      password: hashedPassword,
      telephone,
      adresse,
      cin,
      cv,
      competences,
      experiences
    });

    await candidat.save();
    res.status(201).json({ message: 'Candidat inscrit avec succès', candidat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Connexion candidat (authentification + JWT)
exports.loginCandidat = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérification de l'existence du candidat
    const candidat = await Candidat.findOne({ email });
    if (!candidat) {
      return res.status(404).json({ message: 'Candidat non trouvé' });
    }

    // Comparaison des mots de passe
    const validPassword = await bcrypt.compare(password, candidat.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Création du token JWT
    const token = jwt.sign({ id: candidat._id, role: 'candidat' }, 'jwtsecretkey', { expiresIn: '1d' });

    // Réponse avec le token et les informations du candidat
    res.json({
      token,
      user: {
        id: candidat._id,
        nom: candidat.nom,
        email: candidat.email,
        telephone: candidat.telephone,
        adresse: candidat.adresse,
        cin: candidat.cin,
        cv: candidat.cv,
        competences: candidat.competences,
        experiences: candidat.experiences,
        role: 'candidat',
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Consulter tous les candidats (avec expériences)
exports.getAllCandidats = async (req, res) => {
  try {
    const candidats = await Candidat.find().populate('experiences');
    res.status(200).json(candidats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des candidats' });
  }
};

// Chercher un ou plusieurs candidats par nom
exports.chercherParNom = async (req, res) => {
  try {
    const { nom } = req.params;

    const candidats = await Candidat.find({
      nom: { $regex: nom, $options: 'i' } // recherche insensible à la casse
    }).populate('experiences');

    if (candidats.length === 0) {
      return res.status(404).json({ message: 'Aucun candidat trouvé avec ce nom' });
    }

    res.json(candidats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la recherche des candidats' });
  }
};

// Modifier un candidat par CIN
exports.modifierCandidat = async (req, res) => {
  try {
    const { nom, email, telephone, adresse, cin, cv, competences, experiences } = req.body;

    // Recherche du candidat par CIN
    const candidat = await Candidat.findOneAndUpdate(
      { cin: req.params.cin },  // Recherche par CIN au lieu de _id
      { nom, email, telephone, adresse, cin, cv, competences, experiences },
      { new: true }
    );

    if (!candidat) {
      return res.status(404).json({ message: 'Candidat non trouvé' });
    }

    res.json(candidat);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Erreur lors de la mise à jour du profil' });
  }
};

// Supprimer un candidat
exports.supprimerCandidat = async (req, res) => {
  try {
    const candidat = await Candidat.findByIdAndDelete(req.params.id);
    if (!candidat) {
      return res.status(404).json({ message: 'Candidat non trouvé' });
    }
    res.json({ message: 'Candidat supprimé avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la suppression du candidat' });
  }
};
