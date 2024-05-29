const express = require("express");
const { login, logout } = require("../controllers/authController");
const authenticateSession = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/login", login);
router.post("/logout", authenticateSession, logout);

module.exports = router;
