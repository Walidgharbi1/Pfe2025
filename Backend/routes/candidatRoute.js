const express = require("express");
const router = express.Router();
const candidatController = require("../controlleur/candidateControlleur");

// Routes CRUD

router.get("/getAllCandidats", candidatController.getAllCandidats);

router.delete("/supprimerCandidate/:id", candidatController.supprimerCandidate);

router.put("/updateCandidat/:id", candidatController.updateCandidate);
module.exports = router;
