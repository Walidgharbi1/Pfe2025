const mongoose = require("mongoose");
const Test = require("./Test");
const Utilisateur = require("./Utilisateur");

const ReponseSchema = new mongoose.Schema({
  score: {
    type: Number,
    default: 0,
  },
  id_test: {
    type: mongoose.Types.ObjectId,
    ref: "Test",
    required: true,
  },
  offre_id: {
    type: mongoose.Types.ObjectId,
    ref: "Offre",
    required: true,
  },
  candidat_id: {
    type: mongoose.Types.ObjectId,
    ref: "Utilisateur",
    required: true,
  },
  reponses: [
    {
      questionId: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      type: {
        type: String,
        enum: ["text", "single", "multiple", "select"],
        required: true,
      },
      answer: {
        type: mongoose.Schema.Types.Mixed, // can be string or array
        required: true,
      },
    },
  ],
  warningCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Reponse", ReponseSchema);
