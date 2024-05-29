const jwt = require("jsonwebtoken");
const receivedEmailDAO = require("../Models/ReceivedEmailDAO");
const { awsConfig } = require("../config");
const aws = require("aws-sdk");

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
    const s3 = new aws.S3({
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      region: awsConfig.region,
    });

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

module.exports = {
  getEmails,
  fetchEmailFromS3,
};
