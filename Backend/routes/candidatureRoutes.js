const express = require("express");
const router = express.Router();
const candidatureController = require("../controlleur/candidatureController");
const upload = require("../middlewares/multer");

// Routes
router.post(
  "/createCandidature",
  upload.single("cv"),
  candidatureController.createCandidature
);
router.get("/getAllCandidatures", candidatureController.getAllCandidatures);
router.get("/getCandidature/:id", candidatureController.getCandidatureById);
router.delete(
  "/deleteCandidature/:id",
  candidatureController.deleteCandidature
);

module.exports = router;
