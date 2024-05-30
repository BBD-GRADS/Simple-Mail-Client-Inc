const express = require("express");
const {
  getMailbox,
  fetchEmailFromS3,
  sendEmail,
  fetchSentEmailFromS3,
  getSent,
} = require("../controllers/emailController");

const router = express.Router();

router.get("/mailbox", getMailbox);
router.get("/sent", getSent);
router.get("/received-email", fetchEmailFromS3);
router.post("/send", sendEmail);
router.get("/sent-email", fetchSentEmailFromS3);

module.exports = router;
