const pool = require("../config/db");
const receivedEmail = require("./ReceivedEmail");

const tableName = "received_emails";

const receivedEmailDAO = {
  async getEmails(email, page = 1, pageSize = 10) {
    const offset = (page - 1) * pageSize;
    const { rows } = await pool.query(
      `SELECT * FROM ${tableName} WHERE recipient = $1 ORDER BY received_time DESC LIMIT $2 OFFSET $3;`,
      [email, pageSize, offset]
    );

    const totalRows = await pool.query(
      `SELECT COUNT(*) FROM ${tableName} WHERE recipient = $1;`,
      [email]
    );

    const totalEmails = parseInt(totalRows.rows[0].count, 10);
    const hasNextPage = offset + rows.length < totalEmails;
    const hasPrevPage = page > 1;

    return {
      emails: rows.map((row) =>
        receivedEmail(
          row.s3_email_id,
          row.recipient,
          row.sender,
          row.received_time,
          row.has_attachments,
          row.subject
        )
      ),
      hasPrevPage,
      hasNextPage,
    };
  },

  async getReceiver(emailId) {
    const { rows } = await pool.query(
      `SELECT recipient FROM ${tableName} WHERE s3_email_id = $1;`,
      [emailId]
    );
    if (rows.length === 0) return null;
    return rows[0].recipient;
  },
};

module.exports = receivedEmailDAO;
