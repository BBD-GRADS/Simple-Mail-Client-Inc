const pool = require("../config/db");
const sentEmail = require("./SentEmail");

const tableName = "sent_emails";

const sentEmailDAO = {
  async getEmails(email, amount = 20) {
    const { rows } = await pool.query(
      `SELECT * FROM ${tableName} WHERE sender = $1 ORDER BY sent_time DESC LIMIT $2;`,
      [email, amount]
    );
    if (rows.length === 0) return [];
    return rows.map((row) =>
      sentEmail(
        row.s3_email_id,
        row.recipient,
        row.sender,
        row.sent_time,
        row.has_attachments,
        row.subject
      )
    );
  },
  async insert(emailData) {
    const { s3EmailId, recipient, sender, sentTime, hasAttachments, subject } =
      emailData;
    const query = `
    INSERT INTO ${tableName} (s3_email_id, recipient, sender, sent_time, has_attachments, subject)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
    const values = [
      s3EmailId,
      recipient,
      sender,
      sentTime,
      hasAttachments,
      subject,
    ];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      throw new Error("Failed to insert email data");
    }
    const { s3_email_id, ...rest } = rows[0];
    return sentEmail(s3_email_id, ...Object.values(rest));
  },
  async getSender(emailId) {
    const { rows } = await pool.query(
      `SELECT sender FROM ${tableName} WHERE s3_email_id = $1;`,
      [emailId]
    );
    if (rows.length === 0) return null;
    return rows[0].sender;
  },
};

module.exports = sentEmailDAO;
