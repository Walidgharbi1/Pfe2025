const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  titre: { type: String, required: true }, // Titre du test (ex. : "Test de Développement Web")
  description: { type: String, required: true }, // Description du test
  questions: [{
    question: { type: String, required: true }, // Texte de la question
    reponses: [{
      text: { type: String, required: true }, // Réponse possible
      estCorrecte: { type: Boolean, required: true }, // Indique si la réponse est correcte
    }],
  }],
});

module.exports = mongoose.model('Test', testSchema);
