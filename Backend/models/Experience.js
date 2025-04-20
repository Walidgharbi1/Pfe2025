const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['professionnelle', 'academique'],
    required: true
  },
  titre: String, // ex: "Développeur Web" ou "Licence en Informatique"
  entreprise: String, // ou université
  lieu: String,
  date_debut: Date,
  date_fin: Date,
  description: String
});

module.exports = mongoose.model('Experience', experienceSchema);
