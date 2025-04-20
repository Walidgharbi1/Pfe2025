const mongoose = require('mongoose');

const offreSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  datePublication: { type: Date, default: Date.now },
  dateExpiration: { type: Date, required: true },
  specialite: { type: String, required: true }, // Spécialité de l'offre, ex: "Backend", "Frontend"
  salaire: { type: Number, required: true },  // Salaire proposé
  statut: { type: String, enum: ['ouvert', 'fermé'], default: 'ouvert' }, // Statut de l'offre
  type: { type: String, enum: ['stage', 'emploi'], required: true } // Type de l'offre : stage ou emploi
});

module.exports = mongoose.model('Offre', offreSchema);
