const mongoose = require('mongoose');

const competenceSchema = new mongoose.Schema({
  nom: String,
  categorie: String,
  niveau: Number
});

module.exports = mongoose.model('Competence', competenceSchema);
