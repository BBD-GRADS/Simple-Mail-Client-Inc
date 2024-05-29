const express = require("express");
const authenticateSession = require("../middleware/authMiddleware");
const {
  getEmails,
  fetchEmailFromS3,
} = require("../controllers/emailController");

const router = express.Router();

router.get("/list", getEmails);
router.get("/fetch-email", fetchEmailFromS3);

module.exports = router;
