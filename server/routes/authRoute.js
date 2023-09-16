const {
  Signup,
  Login,
  ResetPassword,
  RequestPasswordReset,
} = require("../controllers/authController");
const express = require("express");
const { userVerification } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", Signup);
router.post("/login", Login);
router.post("/", userVerification);
router.post("/request-password-reset", RequestPasswordReset);
router.post("/reset-password", ResetPassword);

module.exports = router;
