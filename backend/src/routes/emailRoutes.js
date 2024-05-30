const express = require("express");
const authenticateSession = require("../middleware/authMiddleware");
const {
  getEmails,
  fetchEmailFromS3,
  sendEmail,
} = require("../controllers/emailController");

const router = express.Router();

router.get("/list", getEmails);
router.get("/fetch-email", fetchEmailFromS3);
router.post("/send", sendEmail);

module.exports = router;
