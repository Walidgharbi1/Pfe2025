const mongoose = require('mongoose');

const chefRecrutementSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('ChefRecrutement', chefRecrutementSchema);
