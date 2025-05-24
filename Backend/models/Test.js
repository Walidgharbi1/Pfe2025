const mongoose = require("mongoose");
const Offre = require("./Offre");

const testSchema = new mongoose.Schema({
  titre: { type: String, required: true }, // Titre du test (ex. : "Test de Développement Web")
  description: { type: String, required: true },
  offre_id: {
    type: mongoose.Types.ObjectId,
    ref: Offre,
  }, // Description du test
  questions: [
    {
      type: {
        type: String,
      },
      text: { type: String, required: true },
      correctAnswer: { type: String },
      correctAnswers: {
        type: [String],
      },
      options: {
        type: [String],
      },
    },
  ],
});

module.exports = mongoose.model("Test", testSchema);
