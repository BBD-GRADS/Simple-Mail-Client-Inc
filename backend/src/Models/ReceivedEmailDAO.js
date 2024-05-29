const pool = require("../config/db");
const receivedEmail = require("./ReceivedEmail");

const tableName = "received_emails";

const receivedEmailDAO = {
  async getEmails(email, amount = 20) {
    const { rows } = await pool.query(
      `SELECT * FROM ${tableName} WHERE recipient = $1 ORDER BY received_time DESC LIMIT $2;`,
      [email, amount]
    );
    if (rows.length === 0) return [];
    return rows.map((row) =>
      receivedEmail(
        row.s3_email_id,
        row.recipient,
        row.sender,
        row.received_time,
        row.has_attachments,
        row.subject
      )
    );
  },
};

module.exports = receivedEmailDAO;
