const express = require("express");
const { getCandidatCv } = require("../controlleur/CvController");

let router = express.Router();

router.get("/getCandidatCv/:id", getCandidatCv);

module.exports = router;
