const express = require("express");
const router = express.Router();
const testController = require("../controlleur/testController");
const verifyToken = require("../middlewares/verifyToken"); // Middleware JWT

// Route pour créer un test (protéger l'accès aux admins uniquement)
router.post(
  "/ajouter_test",
  /*verifyToken(['admin']),*/ testController.createTest
);

// Route pour récupérer tous les tests (accessible publiquement ou à admin)
router.get("/get_all_tests", testController.getAllTests);

// Route pour récupérer un test spécifique par ID
router.get("/get_test/:id", testController.getTestById);

router.get("/get_test_by_offre_id/:id", testController.getTestByOffreId);

// Route pour modifier un test (protéger l'accès aux admins uniquement)
router.put("/:id", /*verifyToken(['admin']), */ testController.updateTest);

// Route pour supprimer un test (protéger l'accès aux admins uniquement)
router.delete("/delete_test/:id", /*verifyToken(['admin']),*/ testController.deleteTest);

module.exports = router;
