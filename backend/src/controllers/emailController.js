const jwt = require("jsonwebtoken");
const receivedEmailDAO = require("../Models/ReceivedEmailDAO");
const { aws, transporter } = require("../config/aws");
const { awsConfig } = require("../config");

async function getEmails(req, res) {
  try {
    const { email, amount } = req.query;
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
  //TODO check if user email
  const { s3EmailId } = req.query;
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

  if (!to || !subject || !text) {
    return res
      .status(400)
      .json({ error: "To, subject, and text are required" });
  }

  const mailOptions = {
    from: "test@email95.net", //TODO get email from user check if in db ,check what happens if fake email
    to,
    subject,
    text,
    html, // If you have HTML content, otherwise remove this line
    attachments:
      attachments &&
      attachments.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content, //base64
      })),
    ses: {
      // Optional extra arguments for SendRawEmail
      // Tags: [
      //   {
      //     Name: "tag_name",
      //     Value: "tag_value",
      //   },
      // ],
    },
  };
  //TODO save in sent db and s3
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return res
      .status(200)
      .json({ message: "Email sent", messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getEmails,
  fetchEmailFromS3,
  sendEmail,
};
