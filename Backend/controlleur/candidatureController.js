const candidature = require("../models/Candidature");
const Candidature = require("../models/Candidature");

// Create a new candidature
exports.createCandidature = async (req, res) => {
  try {
    const { user_id, cv_path, offre_id } = req.body;

    const newCandidature = new Candidature({
      user_id: user_id,
      cv_path: req.file ? req.file.path : cv_path,

      offre_id: offre_id,
    });
    await newCandidature.save();
    res.status(201).json(newCandidature);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all candidatures
exports.getAllCandidatures = async (req, res) => {
  try {
    const candidatures = await Candidature.find()
      .populate("user_id")
      .populate("offre_id");
    res.status(200).json(candidatures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single candidature by ID
exports.getCandidatureById = async (req, res) => {
  try {
    const candidature = await Candidature.findById(req.params.id)
      .populate("user_id")
      .populate("offre_id");
    if (!candidature) {
      return res.status(404).json({ message: "Candidature not found" });
    }
    res.status(200).json(candidature);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a candidature by ID
exports.deleteCandidature = async (req, res) => {
  try {
    const deleted = await Candidature.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Candidature not found" });
    }
    res.status(200).json({ message: "Candidature deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCandidaturesByCandidatId = async (req, res) => {
  try {
    let result = await Candidature.find({ user_id: req.params.id }).populate(
      "offre_id"
    );
    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCandidature = async (req, res) => {
  try {
    let result = await Candidature.findByIdAndUpdate(req.params.id, req.body);
    return res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
