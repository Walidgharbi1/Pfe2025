const mongoose = require("mongoose");
const candidature = require("./Candidature");
const utilisateur = require("./Utilisateur");
const Offre = require("./Offre");

const interviewSchema = new mongoose.Schema({
  candidature_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: candidature,
    required: true,
  },
  candidate_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: utilisateur,
    required: true,
  },
  offer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Offre,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number, // in minutes
    required: true,
    default: 30,
  },
  status: {
    type: String,
    enum: ["scheduled", "completed", "cancelled", "rescheduled"],
    default: "scheduled",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Update the updated_at field before saving
interviewSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
