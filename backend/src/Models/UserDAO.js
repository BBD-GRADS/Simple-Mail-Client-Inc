const pool = require("../config/db");
const user = require("./ReceivedEmail");

const tableName = "users";

const userDAO = {
  async createUser(email, password) {
    const { rows } = await pool.query(
      `INSERT INTO ${tableName} (email, password) VALUES ($1, $2) RETURNING *;`,
      [email, password]
    );
    if (rows.length === 0) return undefined;
    return user(rows[0].user_id, rows[0].email, rows[0].created_at);
  },
};

module.exports = userDAO;
