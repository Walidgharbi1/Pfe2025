const express = require("express");
const {
  loginController,
  registerController,
  updateProfileController,
  getUsers,
} = require("../controlleur/authController");
const upload = require("../middlewares/multer");

let router = express.Router();

router.post("/register", upload.single("cv"), registerController);

router.post("/login", loginController);

router.put("/update_profile", upload.single("cv"), updateProfileController);

router.get("/get_all_users", getUsers);

module.exports = router;
