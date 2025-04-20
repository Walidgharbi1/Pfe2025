const mongoose = require('mongoose');

const candidatSchema = new mongoose.Schema({
  nom: String,
  email: String,
  password: String,
  telephone: String,
  adresse: String,
  cin: { type: String, unique: true },
  cv: String,
  competences: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competence'
  }],
  experiences: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experience'
  }]
});

module.exports = mongoose.model('Candidat', candidatSchema);
