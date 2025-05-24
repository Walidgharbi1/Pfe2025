const express = require("express");
const router = express.Router();
const reponseController = require("../controlleur/reponseController");
const verifyToken = require("../middlewares/verifyToken"); // Middleware JWT

router.post("/ajouterReponse", reponseController.addReponse);

// Route pour récupérer une offre par ID (publique ou protégée)
router.get("/reponses/:id", reponseController.getReponseById);

router.get(
  "/verifyHasAnswered/:user_id/:offre_id",
  reponseController.verifyHasAnswered
);

module.exports = router;
