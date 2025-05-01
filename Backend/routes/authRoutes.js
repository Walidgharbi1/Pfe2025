const express = require("express");
const {
  loginController,
  registerController,
} = require("../controlleur/authController");
const upload = require("../middlewares/multer");

let router = express.Router();

router.post("/register", upload.single("cv"), registerController);

router.post("/login", loginController);

module.exports = router;
