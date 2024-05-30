const express = require("express");
const authenticateSession = require("../middleware/authMiddleware");
const {
  getMailbox,
  fetchEmailFromS3,
  sendEmail,
} = require("../controllers/emailController");

const router = express.Router();

router.get("/mailbox", getMailbox);
router.get("/fetch-email", fetchEmailFromS3);
router.post("/send", sendEmail);

module.exports = router;
