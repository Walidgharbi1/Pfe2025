const Test = require("../models/Test");

// Créer un nouveau test
exports.createTest = async (req, res) => {
  console.log(req.body);
  const { offre_id, titre, description, questions } = req.body;

  try {
    const newTest = new Test({ offre_id, titre, description, questions });
    await newTest.save();
    res.status(201).json(newTest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Récupérer tous les tests
exports.getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().populate("offre_id");
    res.status(200).json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un test par ID
exports.getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate("offre_id");
    if (!test) {
      return res.status(404).json({ message: "Test non trouvé" });
    }
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTestByOffreId = async (req, res) => {
  try {
    const test = await Test.findOne({ offre_id: req.params.id });
    if (!test) {
      return res.status(404).json({ message: "Test non trouvé" });
    }
    res.status(200).json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier un test
exports.updateTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!test) {
      return res.status(404).json({ message: "Test non trouvé" });
    }
    res.status(200).json(test);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprimer un test
exports.deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) {
      return res.status(404).json({ message: "Test non trouvé" });
    }
    res.status(200).json({ message: "Test supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
