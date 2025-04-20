const mongoose = require('mongoose');

const AdministrateurSchema = new mongoose.Schema({
  nom: String,
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true }
});

module.exports = mongoose.model('Administrateur', AdministrateurSchema);
