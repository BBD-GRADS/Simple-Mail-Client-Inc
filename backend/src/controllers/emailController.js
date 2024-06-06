const jwt = require("jsonwebtoken");
const receivedEmailDAO = require("../Models/ReceivedEmailDAO");
const sentEmailDAO = require("../Models/SentEmailDAO");
const { aws, transporter } = require("../config/aws");
const { awsConfig } = require("../config");

async function getMailbox(req, res) {
  try {
    const { page, pageSize } = req.query;
    const email = req.user["cognito:username"];
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const pageNumber = page ? parseInt(page, 10) : 1;
    const size = pageSize ? parseInt(pageSize, 10) : 10;

    const { emails, hasPrevPage, hasNextPage } =
      await receivedEmailDAO.getEmails(email, pageNumber, size);

    return res.status(200).json({ emails, hasPrevPage, hasNextPage });
  } catch (error) {
    console.error("Error fetching emails:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getSent(req, res) {
  try {
    const { page, pageSize } = req.query;
    const email = req.user["cognito:username"];
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const pageNumber = page ? parseInt(page, 10) : 1;
    const size = pageSize ? parseInt(pageSize, 10) : 10;

    const { emails, hasPrevPage, hasNextPage } =
      await sentEmailDAO.getSentEmails(email, pageNumber, size);

    return res.status(200).json({ emails, hasPrevPage, hasNextPage });
  } catch (error) {
    console.error("Error fetching sent emails:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function fetchEmailFromS3(req, res) {
  const email = req.user["cognito:username"];
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

async function fetchSentEmailFromS3(req, res) {
  const email = req.user["cognito:username"];
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const { s3EmailId } = req.query;

  if (!s3EmailId) {
    return res.status(400).json({ error: "s3EmailId is required" });
  }

  const mailSender = await sentEmailDAO.getSender(s3EmailId);

  if (mailSender !== email) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  let objectPath = s3EmailId;
  if (awsConfig.s3MailPrefix) {
    objectPath = `sent/${s3EmailId}`;
  }

  const params = {
    Bucket: awsConfig.s3BucketName,
    Key: objectPath,
  };

  try {
    const s3 = new aws.S3();

    const data = await s3.getObject(params).promise();
    const emailContent = JSON.parse(data.Body.toString("utf-8"));

    res.set({
      "Content-Disposition": `attachment; filename="${s3EmailId}.json"`,
      "Content-Type": "application/json",
    });
    res.json(emailContent);
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

  const email = req.user["cognito:username"];
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
        content: attachment.content,
        encoding: "base64", //base64
      })),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    const messageId = info.messageId.match(/(?<=<)([^@]+)/)[0];

    console.log("Message sent: %s", messageId);

    // Store the sent email in S3
    const s3 = new aws.S3();
    const s3Params = {
      Bucket: awsConfig.s3BucketName,
      Key: `sent/${messageId}`,
      Body: JSON.stringify(mailOptions),
    };
    await s3.putObject(s3Params).promise();

    // Save metadata in the database
    await sentEmailDAO.insert({
      s3EmailId: messageId,
      recipient: to,
      sender: mailOptions.from,
      sentTime: new Date().toISOString(),
      hasAttachments: !!attachments && attachments.length > 0,
      subject,
    });

    return res
      .status(200)
      .json({ message: "Email sent", messageId: messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getMailbox,
  getSent,
  fetchEmailFromS3,
  sendEmail,
  fetchSentEmailFromS3,
};
