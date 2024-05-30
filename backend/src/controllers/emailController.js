const jwt = require("jsonwebtoken");
const receivedEmailDAO = require("../Models/ReceivedEmailDAO");
const sentEmailDAO = require("../Models/SentEmailDAO");
const { aws, transporter } = require("../config/aws");
const { awsConfig } = require("../config");

async function getMailbox(req, res) {
  try {
    const { amount } = req.query;
    const email = req.user.email;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const emails = await receivedEmailDAO.getEmails(
      email,
      amount ? parseInt(amount, 10) : undefined
    );

    return res.status(200).json(emails);
  } catch (error) {
    console.error("Error fetching emails:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function fetchEmailFromS3(req, res) {
  const { email } = req.user.email;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const { s3EmailId } = req.query;

  mailRecipient = await receivedEmailDAO.getReceiver(s3EmailId);

  if (mailRecipient !== email) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  if (!s3EmailId) {
    return res.status(400).json({ error: "s3EmailId is required" });
  }

  let object_path = s3EmailId;
  if (awsConfig.s3MailPrefix) {
    object_path = `${awsConfig.s3MailPrefix}/${s3EmailId}`;
  }

  const params = {
    Bucket: awsConfig.s3BucketName,
    Key: object_path,
  };

  try {
    const s3 = new aws.S3();

    const data = await s3.getObject(params).promise();
    const emailContent = data.Body.toString("utf-8");

    res.set({
      "Content-Disposition": `attachment; filename="${s3EmailId}"`,
      "Content-Type": "text/plain",
    });
    res.send(emailContent);
  } catch (error) {
    console.error("Error fetching email from S3:", error);
    if (error.code === "NoSuchKey") {
      return res.status(404).json({ error: "Email not found" });
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function sendEmail(req, res) {
  const { to, subject, text, html, attachments } = req.body;

  const email = req.user.email;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!to || !subject || !text) {
    return res
      .status(400)
      .json({ error: "To, subject, and text are required" });
  }

  const mailOptions = {
    from: email,
    to,
    subject,
    text,
    html,
    attachments:
      attachments &&
      attachments.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content, //base64
      })),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);

    // Store the sent email in S3
    const s3 = new aws.S3();
    const s3Params = {
      Bucket: awsConfig.s3BucketName,
      Key: `sent/${info.messageId}`,
      Body: JSON.stringify(mailOptions),
    };
    await s3.putObject(s3Params).promise();

    // Save metadata in the database
    await sentEmailDAO.insert({
      s3EmailId: info.messageId,
      recipient: to,
      sender: mailOptions.from,
      sentTime: new Date().toISOString(),
      hasAttachments: !!attachments && attachments.length > 0,
      subject,
    });

    return res
      .status(200)
      .json({ message: "Email sent", messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getMailbox,
  fetchEmailFromS3,
  sendEmail,
};
