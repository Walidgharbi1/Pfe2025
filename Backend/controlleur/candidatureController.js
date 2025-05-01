const Candidature = require("../models/Candidature");

// Create a new candidature
exports.createCandidature = async (req, res) => {
  try {
    const { user_id, cv_path } = req.body;

    const newCandidature = new Candidature({
      user_id: user_id,
      cv_path: req.file ? req.file.path : cv_path,
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
    const candidatures = await Candidature.find().populate("user_id");
    res.status(200).json(candidatures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single candidature by ID
exports.getCandidatureById = async (req, res) => {
  try {
    const candidature = await Candidature.findById(req.params.id).populate(
      "user_id"
    );
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
