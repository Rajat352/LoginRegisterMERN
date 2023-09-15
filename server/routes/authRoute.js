const { Signup, Login } = require("../controllers/authController");
const express = require("express");
const { userVerification } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", Signup);
router.post("/login", Login);
router.post("/", userVerification);

module.exports = router;
